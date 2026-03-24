// Timestamp
document.addEventListener("DOMContentLoaded", () => {
document.getElementById("timestamp").value = new Date().toISOString();
});


// open modal
function openModal(id){
document.getElementById(id).showModal();
}

// close modal
function closeModal(id){
document.getElementById(id).close();
}