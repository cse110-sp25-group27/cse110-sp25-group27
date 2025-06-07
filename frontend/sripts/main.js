if (!updateReviewForm) {
    console.warn('Update review form (#update-form) not found. Editing may not work as expected if it relies on this script managing it.');
} else {
    updateReviewForm.style.display = 'none'; // Ensure it's hidden initially
    const cancelUpdateButton = updateReviewForm.querySelector('#cancel-update');
    if (cancelUpdateButton) {
        cancelUpdateButton.addEventListener('click', () => {
            updateReviewForm.style.display = 'none';
            updateReviewForm.reset();

            const textBubble = document.getElementById('text-bubble');
            if (textBubble) {
                textBubble.classList.remove('expanded');
            }
            
            // After closing the form, ensure the button state is correct.
            updateAddButtonState();
        });
    }
}

// This block handles the logic for toggling the prompt text, which is
// separate from the main form logic.
const addTicketButton = document.getElementById('add-ticket-button');
const promptElement = document.getElementById('prompt');
if (addTicketButton && promptElement) {
    addTicketButton.addEventListener('click', () => {
        promptElement.classList.toggle('hidden');
    });
} 