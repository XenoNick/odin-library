const addButton = document.querySelector('.add-button');
const inputs = [...document.querySelectorAll('.book-info')];
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createErrorMessage(input) {
  const parent = input.parentElement;
  if (!parent.querySelector('.error-container')) {
    const div = document.createElement('div');
    div.classList.add('error-container');
    div.focus();
    const paragraph = document.createElement('p');
    paragraph.classList.add('error-text');
    paragraph.textContent = 'Required';
    div.append(paragraph);
    parent.append(div);
  }
}

function removeErrorMessage(container) {
  const errorMessage = container.querySelector('.error-container');
  if (!errorMessage) return 0;
  errorMessage.remove();
  return 0;
}

addButton.addEventListener('click', () => {
  // check inputs are valid
  const result = inputs.forEach((input) => {
    if (!input.checkValidity()) {
      // if not valid create error popup
      createErrorMessage(input);
      return false;
    }
    removeErrorMessage(input.parentElement);
  });
  if (result === false) return 0;
  // if valid create new book entry
});
