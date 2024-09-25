function photographerTemplate(data) {
    const { name, portrait,city,country,tagline,price, id } = data

    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM() {
        //creer card photographe
        const article = document.createElement( 'article' )

        //lien vers page photographe
        const link = document.createElement('a')
        link.classList.add('photographer-link')
        link.setAttribute('href', `photographer.html?id=${id}`)
        link.setAttribute('aria-label',`Voir la page du photographe ${name}`)
        

        const img = document.createElement( 'img' )
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name}`)

        const h2 = document.createElement( 'h2' )
        h2.textContent = name

        link.appendChild(img)
        link.appendChild(h2)

        //card txt
        const infoTxt = document.createElement('div')
        infoTxt.setAttribute('tabindex','0')
        infoTxt.classList.add('info-txt')

        const location = document.createElement( 'p' )
        location.textContent = `${city}, ${country}`
        location.classList.add('location')

        const taglineEl = document.createElement('p')
        taglineEl.textContent = tagline
        taglineEl.classList.add('tagline')

        const priceEl = document.createElement('p')
        priceEl.textContent = `${price}€/jour`
        priceEl.classList.add('price') 

        
        infoTxt.appendChild(location)
        infoTxt.appendChild(taglineEl)
        infoTxt.appendChild(priceEl)

        article.appendChild(link)
        article.appendChild(infoTxt)



        return (article)
    }
    return { name, picture, getUserCardDOM }
}