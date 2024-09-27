export class Lightbox {

    constructor(mediaList, currentMediaIndex){
        this.mediaList= mediaList
        this.currentMediaIndex = currentMediaIndex

        this.lightboxElement= document.querySelector('.lightbox-modal')
        this.mediaContainer = this.lightboxElement.querySelector('.lightbox-container')
        this.closeBtn = this.lightboxElement.querySelector('.lightbox-close')
        this.nextBtn = this.lightboxElement.querySelector('.lightbox-next')
        this.prevBtn = this.lightboxElement.querySelector('.lightbox-prev')

        this.addEventListeners()
    }

    open() {
        this.displayMedia()
        this.lightboxElement.style.display = 'flex'
    }

    close (){
        this.lightboxElement.style.display = 'none'
    }

    displayMedia() {
        const media = this.mediaList[this.currentMediaIndex]
        this.mediaContainer.innerHTML = ''
        let mediaElement

        if(media.image){
            mediaElement = document.createElement('img')
            mediaElement.setAttribute ('src',`assets/media/${media.image}`)
            mediaElement.setAttribute ('alt', media.title)
        } else if (media.video){
            mediaElement = document.createElement('video')
            mediaElement.setAttribute('src',`assets/media/${media.video}`)
            mediaElement.setAttribute('controls', 'true')
        }
        this.mediaContainer.appendChild(mediaElement)
    }

    nextMedia(){
        this.currentMediaIndex = (this.currentMediaIndex + 1) % this.mediaList.length
        this.displayMedia()
    }

    prevMedia() {
        this.currentMediaIndex = (this.currentMediaIndex - 1 + this.mediaList.length) % this.mediaList.length
        this.displayMedia()
    }
    
    addEventListeners() {
        this.closeBtn.addEventListener('click', ()=> this.close())
        this.nextBtn.addEventListener('click', ()=>this.nextMedia())
        this.prevBtn.addEventListener('click', ()=>this.prevMedia())
    }
}