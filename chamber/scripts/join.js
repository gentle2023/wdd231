// Set timestamp on FORM SUBMIT
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', () => {
        document.getElementById('timestamp').value = new Date().toISOString(); 
    });
}

// Modal Logic
const openButtons = document.querySelectorAll('.open-modal');
const closeButtons = document.querySelectorAll('.close-modal');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.showModal();
        } else {
            console.error(`Modal with id "${modalId}" not found.`);
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});

const allModals = document.querySelectorAll('dialog');
allModals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});