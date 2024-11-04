export class MediaFactory {
    constructor(media){
        this._media = media
        this._title = media.title
        this._likes = media.likes
    }
    //creation du media en fonction de si photo ou video
    createMedia() {
        let mediaElement

        if(this._media.image){
            mediaElement = this.createImage()
        } else if (this._media.video){
            mediaElement = this.createVideo()
        }else {
            console.error('media unfound')
        }
        return mediaElement
    }
    
    createImage() {
        const img = document.createElement('img')
        img.setAttribute('src', `assets/media/${this._media.image}`)
        img.setAttribute('alt', this._media.title)
        return img
    }
    
    createVideo() {
        const video = document.createElement('video')
        video.setAttribute('src',`assets/media/${this._media.video}`)
        video.setAttribute('controls','true')
        return video
    }

    createTitle() {
        const title = document.createElement('h2') 
        title.textContent = this._title
        title.classList.add('media-title')
        return title
    }

    createLikes() {
        const likes = document.createElement('p')
        likes.textContent = this._likes
        likes.classList.add('media-likes')
        return likes
    }
}