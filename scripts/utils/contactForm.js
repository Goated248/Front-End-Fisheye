const modalbtn = document.querySelector('.contact_button')
modalbtn.addEventListener("click", ()=>{
    displayModal()
})



function displayModal() {
    const modal = document.getElementById("contact_modal")
	modal.style.display = "flex"
    const closeBtn = document.getElementById("close-btn")
    closeBtn.addEventListener("click", ()=> {
        closeModal()
    })
}

function closeModal() {
    const modal = document.getElementById("contact_modal")
    modal.style.display = "none"
}
