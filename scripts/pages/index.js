    async function getPhotographers() {
        //recupere data photographes
        const response = await fetch('data/photographers.json')
        const data = await response.json()
        return data
  
    }


    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère et affiche les data
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
