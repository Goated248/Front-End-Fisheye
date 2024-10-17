import {MediaFactory} from '../factories/MediaFactory.js'
import { Lightbox } from '../utils/lightbox.js'
import { LikesManagement } from '../utils/likesCount.js'
import { sortMedia } from '../utils/tri.js'

//recupération des photographes
async function getPhotographers() {
    const response = await fetch ('data/photographers.json')
    const data = await response.json()
    return data.photographers
    
}
//recuperation des medias
async function getMedia () {
    const response = await fetch('data/photographers.json')
    const data = await response.json()
    return data.media

}

async function calculateTotalLikes() {
    const mediaList = await getMedia()
    const totalLikes = mediaList.reduce((acc, media) => {
        return acc + media.likes
    },0)
    return totalLikes
}

//creer la media gallery
async function displayMedia(photographerId,likesEl, sortedMedialist = null) {
    const mediaList = sortedMedialist || await getMedia()
    
    const photographerMedia = mediaList.filter(media=>media.photographerId == photographerId)

    const mediaContainer = document.querySelector('.media-gallery')
    const likesManagement = new LikesManagement(mediaList)
    
    mediaContainer.innerHTML = ''
//creer les elements
    photographerMedia.forEach((media, index )=> {
        const mediaFactory = new MediaFactory(media)

        const mediaElement = mediaFactory.createMedia()
        const titleElement = mediaFactory.createTitle()
        const likesElement = mediaFactory.createLikes()
        

        const mediaCard = document.createElement('div')
         mediaCard.setAttribute('tabindex','0')
        mediaCard.classList.add('media-card')

        const mediaWindow = document.createElement('div')
        mediaWindow.classList.add('media-window')

        const mediaTxt = document.createElement('div')
        mediaTxt.classList.add('media-txt')
        
        titleElement.setAttribute('tabindex','0')
        likesElement.setAttribute('tabindex','0')

        //ajoute les element au DOM
        mediaWindow.appendChild(mediaElement)
        mediaTxt.appendChild(titleElement)
        mediaTxt.appendChild(likesElement)

        const heartIcon =document.createElement('i')
        heartIcon.classList.add('fa-solid','fa-heart','heart-icon')
        likesElement.appendChild(heartIcon)

        mediaCard.appendChild(mediaWindow)
        mediaCard.appendChild(mediaTxt)
        mediaContainer.appendChild(mediaCard)
//ajoute gestion des likes au click
        likesElement.addEventListener('click', (event) => {
            event.stopPropagation(); 
            const mediaId = media.id; 
            likesManagement.likesCount(mediaId, likesElement, likesEl); 
        });
//ouvre lightbox au click
        mediaCard.addEventListener('click',()=>{
            const lightbox = new Lightbox (photographerMedia, index)
            lightbox.open()
        })
     //ouvre lightbox avec 'enter'
     mediaCard.addEventListener('keydown', (event)=>{
        if (event.key === 'Enter') {
            const lightbox = new Lightbox (photographerMedia, index)
            lightbox.open()
        }
     })

    });
    
}

//gere quel photographe afficher
async function displayPhotographer() {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    const photographers = await getPhotographers()
    const photographer= photographers.find(p=>p.id == id)

    const totalLikes = await calculateTotalLikes()
    

   
//affiche le photographe en fonction de l'id
    if (photographer) {
        const headerTxt = document.querySelector('.header-txt')
        
        const headerTitle = document.createElement('div')
        const headerSubtext = document.createElement('div')
        headerSubtext.setAttribute("tabindex", "0")
        //gere les text du header
        const  nameEl = document.createElement('h1')
        nameEl.textContent = photographer.name
        nameEl.classList.add=('photographer-name')
        nameEl.setAttribute("tabindex", "0")

        const locationEL = document.createElement('p')
        locationEL.textContent= `${photographer.city},${photographer.country}`
        locationEL.classList.add('header-location')

        const taglineElement=document.createElement('p')
        taglineElement.textContent= photographer.tagline
        taglineElement.classList.add('header-tagline')

        const contactName = document.querySelector(".photographer-name")
        contactName.textContent = `${photographer.name}`
       
        headerTitle.appendChild(nameEl)
        headerSubtext.appendChild(locationEL)
        headerSubtext.appendChild(taglineElement)
        headerTxt.appendChild(headerTitle)
        headerTxt.appendChild(headerSubtext)
        
       
        //gere l'image du header
        const imgContainer = document.getElementById('portrait-container')
        const picture = `assets/photographers/${photographer.portrait}`
        const img = document.createElement( 'img' )
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${photographer.name}`)

        imgContainer.appendChild (img)

        //affiche prix et total likes
        const likesAndPrice = document.querySelector('.total-likes_price')
         const priceEl = document.createElement('span')
        priceEl.textContent= `${photographer.price}€/jour`
         priceEl.classList.add('photographer-price')

         const likesEl = document.createElement('span')
         likesEl.textContent = `${totalLikes}`
         likesEl.classList.add('photographer-total_likes')
            
        likesAndPrice.appendChild(likesEl)
        likesAndPrice.appendChild(priceEl)
        
        
         await displayMedia(photographer.id, likesEl)

         //ajoute écouteur sur menu déroulant pour gérer tri
         const sortSelect = document.getElementById('tri-select')
         sortSelect.addEventListener ('change', async function (event) {
            let selectedOption = event.target.value
            const mediaList = await getMedia()

            const sortedMedia = sortMedia(mediaList,selectedOption)
            await displayMedia(photographer.id, likesEl, sortedMedia)
         })

    } else {
        console.error('error')
    }
}

displayPhotographer()