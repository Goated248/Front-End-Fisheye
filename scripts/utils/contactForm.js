const modalbtn = document.querySelector('.contact_button')
modalbtn.addEventListener("click", ()=>{
    displayModal()
    document.querySelector('.modal').focus()
})

function displayModal() {

    const modal = document.getElementById("contact_modal")
	modal.style.display = "flex"
    

    const closeBtn = document.getElementById("close-btn")
    closeBtn.addEventListener("click", ()=> {
        closeModal()
    })

    document.addEventListener("keydown", handleEscapeKey)

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

function handleEscapeKey (event) {
    if (event.key ==='Escape' || event.key === 'Esc') {
        closeModal()
    }
}

function closeModal() {
    const modal = document.getElementById("contact_modal")
    modal.style.display = "none"
    modalbtn.focus()
    
}
