const addButton = document.getElementById('add-ticket-button');
const textBubble = document.getElementById('text-bubble');
const formContainer = document.getElementById('form-container');

let formLoaded = false;

addButton.addEventListener('click', async () => {
    console.log("hello")
  if (!formLoaded) {
    try {
      const response = await fetch('../components/template.html');
      const html = await response.text();
      formContainer.innerHTML = html;
      formLoaded = true;
    } catch (err) {
      console.error('Failed to load form:', err);
    }
  }

  textBubble.classList.toggle('expanded');
  formContainer.classList.toggle('hidden');
});
