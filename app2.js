const inputs = [...document.querySelectorAll('.book-info')];
const addButton = document.querySelector('.add-button');

function addErrorMessage(input) {
  const errorContainer = input.nextElementSibling;
  errorContainer.classList.add('error-container');
}

function clearErrorMessage(input) {
  const errorContainer = input.nextElementSibling;
  if (errorContainer.classList.contains('error-container')) {
    errorContainer.classList.remove('error-container');
  }
}

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  let isValid = true;
  inputs.forEach((input) => {
    clearErrorMessage(input);
    if (!input.checkValidity()) {
      isValid = false;
      addErrorMessage(input);
    }
  });
});
