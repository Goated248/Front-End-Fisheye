import {MediaFactory} from '../factories/MediaFactory.js'

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
//ouverture de la lightbox
    open() {
        this.lastFocusedElement =document.activeElement
        const main = document.querySelector('main')
        const header = document.querySelector('header') 

        this.displayMedia()
        this.displayTitle ()
        this.lightboxElement.style.display = 'flex'
        this.lightboxElement.setAttribute('aria-hidden', "false")
        
        this.trapFocus()
        main.setAttribute('aria-hidden', "true")
        header.setAttribute('aria-hidden', "true")
        document.addEventListener('keydown', (event) => this.handleKeyDown(event))
    }
//fermeture de la lightbox
    close (){
        this.lightboxElement.removeAttribute('aria-hidden')
        this.lightboxElement.style.display = 'none'
        const main = document.querySelector('main')
        const header = document.querySelector('header')  
        main.removeAttribute('aria-hidden')
        header.removeAttribute('aria-hidden')
        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus()
        }

        document.removeEventListener('keydown', (event) => this.handleKeyDown(event))
    }
//affiche le media en fonction de son format
    displayMedia() {
        const media = this.mediaList[this.currentMediaIndex]
        this.mediaContainer.innerHTML = ''
        
        const mediaFactory = new MediaFactory(media)
        const mediaElement = mediaFactory.createMedia()
        if (mediaElement && mediaElement.tagName==='VIDEO'){
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
//passage au media suivant
    nextMedia(){
        this.currentMediaIndex = (this.currentMediaIndex + 1) % this.mediaList.length
        this.displayMedia()
        this.displayTitle ()
    }
//passage au media precedent
    prevMedia() {
        this.currentMediaIndex = (this.currentMediaIndex - 1 + this.mediaList.length) % this.mediaList.length
        this.displayMedia()
        this.displayTitle ()
    }
 //gestion du focus dans la lightbox   
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

//gestion de la navigation avec tab
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
//navigation dans la lightboxx au clavier
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