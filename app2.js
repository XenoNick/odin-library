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
  return userBook;
}

function createElement(userBook, class1, class2) {
  const paragraph = document.createElement('p');
  paragraph.classList.add(class1);
  const span1 = document.createElement('span');
  span1.classList.add(class1);
  span1.textContent = `${class1.charAt(0).toUpperCase() + class1.slice(1)}:`;
  const span2 = document.createElement('span');
  span2.classList.add(class2);
  span2.textContent = userBook[class1];
  paragraph.append(span1, span2);
  return paragraph;
}

function createCard(userBook) {
  const grid = document.querySelector('.main');
  const div = document.createElement('div');
  div.classList.add('card');
  div.setAttribute('data-index', String(library.indexOf(userBook)));
  const title = document.createElement('h2');
  title.classList.add('book-title');
  title.textContent = userBook.title;
  const author = createElement(userBook, 'author', 'auth-name');
  const pages = createElement(userBook, 'pages', 'amount');
  const toggleButton = createToggleButton(userBook);
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
    createCard(createBookEntry());
  }
});
