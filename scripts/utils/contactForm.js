const modalbtn = document.querySelector('.contact_button')
modalbtn.addEventListener("click", ()=>{
    displayModal()
    document.querySelector('.modal').focus()
})
//affichage de la modale et empeche le rechargement de la page
function displayModal() {

    const modal = document.getElementById("contact_modal")
    const main = document.querySelector('main')
    const header = document.querySelector('header')
	modal.style.display = "flex"
    modal.setAttribute('aria-hidden', "false")
    main.setAttribute('aria-hidden', "true")
    header.setAttribute('aria-hidden', "true")

    const closeBtn = document.getElementById("close-btn")
    closeBtn.addEventListener("click", (event)=> {
        event.preventDefault()
        closeModal()
    })

    const submitForm = document.querySelector("form")
    submitForm.addEventListener("submit",((event) => {
        event.preventDefault()
        getFormElements()
        closeModal()
    }))


    document.addEventListener("keydown", handleEscapeKey)

    //gestion du focus dans la modale
    const focusableElements = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    let firstFocusableElement = focusableElements[0]
    let lastFocusableElement = focusableElements[focusableElements.length - 1]
    firstFocusableElement.focus()

    modal.addEventListener('keydown', function(event) {
        let isTabPressed = (event.key === 'Tab')

        if(!isTabPressed) return

        if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus()
                event.preventDefault()
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus()
                event.preventDefault()
            }
        }   

    })
}
//fermeture de la modale avec echap
function handleEscapeKey (event) {
    if (event.key ==='Escape' || event.key === 'Esc') {
        closeModal()
    }
}

function closeModal() {
    const modal = document.getElementById("contact_modal")
    const main = document.querySelector('main')
    const header = document.querySelector('header') 
    modal.removeAttribute('aria-hidden')
    main.removeAttribute('aria-hidden')
    header.removeAttribute('aria-hidden')
    modal.style.display = "none"
    modalbtn.focus()
    
}

//recupère les informations des champs du formulaire
function getFormElements() {
    const champPrenom = document.getElementById("first")
    const champNom = document.getElementById("last")
    const champEmail= document.getElementById("email")
    const champMessage = document.getElementById("message")
    const prenom = champPrenom.value
    const nom = champNom.value
    const email = champEmail.value
    const message = champMessage.value
    console.log (prenom, nom , email, message)
}