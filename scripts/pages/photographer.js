import {MediaFactory} from '../factories/MediaFactory.js'
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
async function displayMedia(photographerId) {
    const mediaList = await getMedia()
    const photographerMedia = mediaList.filter(media=>media.photographerId == photographerId)

    const mediaContainer = document.querySelector('.media-gallery')

    photographerMedia.forEach(media => {
        const mediaFactory = new MediaFactory(media)

        const mediaElement = mediaFactory.createMedia()
        const titleElement = mediaFactory.createTitle()
        const likesElement = mediaFactory.createLikes()


        const mediaCard = document.createElement('div')
        const mediaWindow = document.createElement('div')
        const mediaTxt = document.createElement('div')
        mediaCard.setAttribute('tabindex','0')
        mediaCard.classList.add('media-card')
        mediaWindow.classList.add('media-window')
        mediaTxt.classList.add('media-txt')

        mediaWindow.appendChild(mediaElement)
        mediaTxt.appendChild(titleElement)
        mediaTxt.appendChild(likesElement)
        mediaCard.appendChild(mediaWindow)
        mediaCard.appendChild(mediaTxt)
        mediaContainer.appendChild(mediaCard)
    });
    
}

//gere quel photographe afficher
async function displayPhotographer() {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    

    const photographers = await getPhotographers()
    const photographer= photographers.find(p=>p.id == id)
//affiche le photographe en fonction de l'id
    if (photographer) {
        const headerTxt = document.querySelector('.header-txt')
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

        headerTxt.appendChild(nameEl)
        headerTxt.appendChild(locationEL)
        headerTxt.appendChild(taglineElement)
       
        //gere l'image du header
        const imgContainer = document.getElementById('portrait-container')
        const picture = `assets/photographers/${photographer.portrait}`
        const img = document.createElement( 'img' )
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${photographer.name}`)

        imgContainer.appendChild (img)

        //ajoute le total de like et le prix
        const totalLikes = await calculateTotalLikes()
        const likesAndPrice = document.querySelector('.total-likes_price')
        const priceEl = document.createElement('span')
        priceEl.textContent= `${photographer.price}€/jour`
        priceEl.classList.add('photographer-price')
        
        const likesEl = document.createElement('span')
        likesEl.textContent = `${totalLikes}`
        likesEl.classList.add('photographer-total_likes')
        
        likesAndPrice.appendChild(likesEl)
        likesAndPrice.appendChild(priceEl)
       

        displayMedia(photographer.id)

    } else {
        console.error('error')
    }
}

displayPhotographer()