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

function updateCards(deleteIndex) {
  const cards = [...document.querySelectorAll('.card')];
  cards.forEach((card) => {
    const cardIndex = +card.getAttribute('data-index');
    if (cardIndex > deleteIndex) {
      card
        .querySelector('label')
        .setAttribute('for', `read-card${cardIndex - 1}`);
      card
        .querySelector('input')
        .setAttribute('id', `read-card${cardIndex - 1}`);
      card
        .querySelector('input')
        .setAttribute('name', `read-card${cardIndex - 1}`);

      card.setAttribute('data-index', `${cardIndex - 1}`);
    }
  });
}

function deleteCard(e) {
  if (e.target.tagName === 'IMG') {
    const container = e.target.parentElement.parentElement.parentElement;
    const deleteIndex = +container.getAttribute('data-index');
    container.remove();
    updateCards(deleteIndex);
    library.splice(deleteIndex, 1);
  }
}

function updateReadStatus(e) {
  const container =
    e.target.parentElement.parentElement.parentElement.parentElement;
  const index = container.getAttribute('data-index');
  library[index].read = !library[index].read;
}

function createToggleButton(userBook) {
  const container = document.createElement('div');
  container.classList.add('toggle-buttons');
  const toggleSwitch = document.createElement('div');
  toggleSwitch.classList.add('input', 'checkbox');
  const label = document.createElement('label');
  label.setAttribute('for', `read-card${library.indexOf(userBook)}`);
  const span = document.createElement('span');
  span.textContent = 'Read:';
  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', `read-card${library.indexOf(userBook)}`);
  input.setAttribute('id', `read-card${library.indexOf(userBook)}`);
  input.checked = userBook.read;
  input.addEventListener('input', updateReadStatus);
  const span2 = document.createElement('span');
  span2.classList.add('slider');
  label.append(span, input, span2);
  toggleSwitch.append(label);
  const button = document.createElement('button');
  button.classList.add('delete');
  const img = document.createElement('img');
  img.setAttribute('src', './icons/trash-can.svg');
  img.classList.add('icon');
  button.append(img);
  button.addEventListener('click', deleteCard);
  container.append(toggleSwitch, button);
  return container;
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
  div.append(title, author, pages, toggleButton);
  grid.append(div);
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
