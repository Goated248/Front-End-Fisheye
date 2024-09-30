//pour gerer l'ajout et la suppression des likes

export class LikesManagement {

    constructor(mediaList) {
        this.likesState = {}
        this.currentLikes = {}
        mediaList.forEach(media => {
            this.likesState[media.id] = false
            this.currentLikes[media.id] = media.likes
        })
    }

    likesCount(mediaId, likesElement,totalLikesElement) {
        //vérifie si média déjà liké
        if(!this.likesState[mediaId]) {
            //si pas liké marque comme liké et ajoute +1 média
            this.likesState[mediaId] = true
            this.currentLikes[mediaId] += 1
            likesElement.childNodes[0].textContent = this.currentLikes[mediaId]
            //ajoute +1 au compteur Total
            let totalLikes = parseInt(totalLikesElement.textContent,10)
            totalLikesElement.textContent = totalLikes += 1
        } else {
            //si déjà liké , likes -1
            this.likesState[mediaId] = false
            this.currentLikes[mediaId] -=1
            likesElement.childNodes[0].textContent = this.currentLikes[mediaId]
            //MAJ total likes
            let totalLikes = parseInt(totalLikesElement.textContent,10)
            totalLikesElement.textContent = totalLikes -= 1
        }

    }

}