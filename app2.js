const inputs = [...document.querySelectorAll('.book-info')];
const addButton = document.querySelector('.add-button');
const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

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

function createBookEntry() {
  const bookValues = inputs.map((input) => {
    if (input.getAttribute('type') === 'checkbox') return input.checked;
    return input.value;
  });
  const userBook = new Book(...bookValues);
  library.push(userBook);
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
  if (isValid) {
    createBookEntry();
  }
});
