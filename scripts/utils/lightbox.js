export class Lightbox {

    constructor(mediaList, currentMediaIndex){

        this.mediaList= mediaList
        this.currentMediaIndex = currentMediaIndex

        this.lightboxElement= document.querySelector('.lightbox-modal')
        this.mediaContainer = this.lightboxElement.querySelector('.lightbox-container')
        this.closeBtn = this.lightboxElement.querySelector('.lightbox-close')
        this.nextBtn = this.lightboxElement.querySelector('.lightbox-next')
        this.prevBtn = this.lightboxElement.querySelector('.lightbox-prev')
        this.lightboxTitle = this.lightboxElement.querySelector('.lightbox-title')
        
        
        

        this.addEventListeners()
    }

    open() {
        this.lastFocusedElement =document.activeElement
            

        this.displayMedia()
        this.displayTitle ()
        this.lightboxElement.style.display = 'flex'
        this.lightboxElement.setAttribute('aria-hidden', "false")

        this.trapFocus()

        document.addEventListener('keydown', (event) => this.handleKeyDown(event))
    }

    close (){
        this.lightboxElement.removeAttribute('aria-hidden')
        this.lightboxElement.style.display = 'none'

        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus()
        }

        document.removeEventListener('keydown', (event) => this.handleKeyDown(event))
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

    displayTitle (){
        const media = this.mediaList[this.currentMediaIndex]
        this.lightboxTitle.innerHTML = ''
        let mediaTitle = document.createTextNode(media.title)
        this.lightboxTitle.appendChild(mediaTitle)
        
    }

    nextMedia(){
        this.currentMediaIndex = (this.currentMediaIndex + 1) % this.mediaList.length
        this.displayMedia()
        this.displayTitle ()
    }

    prevMedia() {
        this.currentMediaIndex = (this.currentMediaIndex - 1 + this.mediaList.length) % this.mediaList.length
        this.displayMedia()
        this.displayTitle ()
    }
    
    trapFocus() {
        const focusOrder = [
            this.lightboxElement.querySelector('.lightbox-modal_body'),
            this.lightboxElement.querySelector('.lightbox-container'),
            this.lightboxElement.querySelector('.lightbox-title'),
            this.lightboxElement.querySelector('.lightbox-prev'),
            this.lightboxElement.querySelector('.lightbox-next'),
            this.lightboxElement.querySelector('.lightbox-close')
        ]

        let currentFocusIndex = 0
        focusOrder[currentFocusIndex].focus()


        this.lightboxElement.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                event.preventDefault()

                if(event.shiftKey) {
                    currentFocusIndex = (currentFocusIndex - 1 +focusOrder.length) % focusOrder.length
                } else {
                    currentFocusIndex = (currentFocusIndex + 1) % focusOrder.length
                }
                
                focusOrder[currentFocusIndex].focus()
            }
        })
    }


    addEventListeners() {

        this.closeBtn.addEventListener('click', ()=> this.close())
        this.nextBtn.addEventListener('click', ()=>this.nextMedia())
        this.prevBtn.addEventListener('click', ()=>this.prevMedia())
        
    }

    handleKeyDown(event) {
        if(event.key === 'Escape' || event.key === 'Esc') {
            this.close()

        } else if (event.key === 'ArrowRight') {
            this.nextMedia()

        }else if (event.key === 'ArrowLeft') {
            this.prevMedia()   
        }

    }

}