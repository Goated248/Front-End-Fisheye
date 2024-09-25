import {MediaFactory} from '../factories/MediaFactory.js'

async function getPhotographers() {
    const response = await fetch ('data/photographers.json')
    const data = await response.json()
    return data.photographers
    
}

async function getMedia () {
    const response = await fetch('data/photographers.json')
    const data = await response.json()
    return data.media

}

async function displayMedia(photographerId) {
    const mediaList = await getMedia()
    const photographerMedia = mediaList.filter(media=>media.photographerId == photographerId)

    const mediaContainer = document.querySelector('.media-gallery')

    photographerMedia.forEach(media => {
        const mediaFactory = new MediaFactory(media)
        const mediaElement = mediaFactory.createMedia()
        mediaContainer.appendChild(mediaElement)
    });
    
}


async function displayPhotographer() {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    

    const photographers = await getPhotographers()
    const photographer= photographers.find(p=>p.id == id)

    if (photographer) {
        const headerTxt = document.querySelector('.header-txt')

        const  nameEl = document.createElement('h2')
        nameEl.textContent = photographer.name

        const locationEL = document.createElement('p')
        locationEL.textContent= `${photographer.city},${photographer.country}`
        locationEL.classList.add('location')

        const taglineElement=document.createElement('p')
        taglineElement.textContent= photographer.tagline
        taglineElement.classList.add('tagline')

        headerTxt.appendChild(nameEl)
        headerTxt.appendChild(locationEL)
        headerTxt.appendChild(taglineElement)
       
        
        const imgContainer = document.getElementById('portrait-container')
        const picture = `assets/photographers/${photographer.portrait}`
        const img = document.createElement( 'img' )
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${photographer.name}`)

        imgContainer.appendChild (img)


        displayMedia(photographer.id)

    } else {
        console.error('error')
    }
}

displayPhotographer()