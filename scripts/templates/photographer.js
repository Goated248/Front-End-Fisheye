function photographerTemplate(data) {
    const { name, portrait,city,country,tagline,price } = data

    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM() {

        const article = document.createElement( 'article' )

        const img = document.createElement( 'img' )
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name}`)

        const h2 = document.createElement( 'h2' )
        h2.textContent = name

        const location = document.createElement( 'h3' )
        location.textContent = `${city}, ${country}`
        location.classList.add('location')

        const taglineEl = document.createElement('p1')
        taglineEl.textContent = tagline
        taglineEl.classList.add('tagline')

        const priceEl = document.createElement('p2')
        priceEl.textContent = `${price}€/jour`
        priceEl.classList.add('price') 



        article.appendChild(img)
        article.appendChild(h2)
        article.appendChild(location)
        article.appendChild(taglineEl)
        article.appendChild(priceEl)

        return (article)
    }
    return { name, picture, getUserCardDOM }
}