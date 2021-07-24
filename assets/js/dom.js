const NOTFINISHED_READ_BOOK_ID = "incompleteBookList";
const FINISHED_READ_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function makeBook(book_title, writer, year, isFinished) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = "Title : ";
  const textWriter = document.createElement("p");
  textWriter.innerText = "Writer : ";
  const textYear = document.createElement("p");
  textYear.innerText = "Year : ";

  const spanTitle = document.createElement("span");
  spanTitle.innerText = book_title;
  spanTitle.classList.add("bookTitle");
  textTitle.append(spanTitle);

  const spanWriter = document.createElement("span");
  spanWriter.innerText = writer;
  spanWriter.classList.add("bookWriter");
  textWriter.append(spanWriter);

  const spanYear = document.createElement("span");
  spanYear.innerText = year;
  spanYear.classList.add("bookYear");
  textYear.append(spanYear);

  const articleElement = document.createElement("article");
  const divElement = document.createElement("div");

  divElement.classList.add("action");
  articleElement.classList.add("book_item");

  articleElement.append(textTitle, textWriter, textYear, divElement);

  if (isFinished) {
    divElement.append(createReadAgainButton(), createDeleteButton());
  } else {
    divElement.append(createFinishedReadingButton(), createDeleteButton());
  }

  return articleElement;
}

function createButton(buttonTypeClass, string, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = string;
  button.addEventListener("click", (event) => {
    eventListener(event);
  });

  return button;
}

function createFinishedReadingButton() {
  return createButton("green", "Complete Reading", (event) => {
    addBookToFinishedRead(event.target.parentElement.parentElement);
  });
}

function createReadAgainButton() {
  return createButton("green", "Read Again", (event) => {
    readAgainBookFromFinishedRead(event.target.parentElement.parentElement);
  });
}

function createDeleteButton() {
  return createButton("red", "Delete", (event) => {
    removeBook(event.target.parentElement.parentElement);
  });
}

function addBook(isNewBook, data) {
  const listNotFinishedReadingBook = document.getElementById(
    NOTFINISHED_READ_BOOK_ID
  );
  const listFinishedReadingBook = document.getElementById(
    FINISHED_READ_BOOK_ID
  );
  if (isNewBook) {
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookWriter = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const isFinished = document.getElementById("inputBookIsComplete").checked;

    const addBook = makeBook(bookTitle, bookWriter, bookYear, isFinished);
    const bookObject = composeBookObject(
      bookTitle,
      bookWriter,
      bookYear,
      isFinished
    );

    addBook[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if (isFinished) {
      listFinishedReadingBook.append(addBook);
      updateDataToStorage();
    } else {
      listNotFinishedReadingBook.append(addBook);
      updateDataToStorage();
    }
  }else if(data != undefined){
    const addBook = makeBook(data.title, data.author, data.year, data.isCompleted);
    addBook[BOOK_ITEMID] = data.id;
    console.log("sedang dicari")

    if (data.isCompleted) {
      listFinishedReadingBook.append(addBook);
    } else {
      listNotFinishedReadingBook.append(addBook);
    }
  }
}

function addBookToFinishedRead(taskElement) {
  const listFinishedReadingBook = document.getElementById(
    FINISHED_READ_BOOK_ID
  );
  const bookTitle = taskElement.querySelector(
    ".book_item > h3 > .bookTitle"
  ).innerText;
  const bookWriter = taskElement.querySelector(
    ".book_item > p > .bookWriter"
  ).innerText;
  const bookYear = taskElement.querySelector(
    ".book_item > p > .bookYear"
  ).innerText;

  const newBook = makeBook(bookTitle, bookWriter, bookYear, true);
  const book = findBookById(taskElement[BOOK_ITEMID]);

  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;

  listFinishedReadingBook.append(newBook);
  taskElement.remove();

  updateDataToStorage();
}

function searchBookByTitle() {
  const bookTitle = document.querySelector("#searchBookTitle").value;

  let findBook = findBookByTitle(bookTitle);

  if (findBook) {
    clearBook();
    for (thebooks of findBook) {
      addBook(false, thebooks);
    }
  }else {
    clearBook();
    for (thebooks of books) {
      addBook(false, thebooks);
    }
  }
}

function clearBook() {
  const listNotFinishedReadingBook = document.getElementById(
    NOTFINISHED_READ_BOOK_ID
  );
  const listFinishedReadingBook = document.getElementById(
    FINISHED_READ_BOOK_ID
  );

  listNotFinishedReadingBook.innerHTML = "";
  listFinishedReadingBook.innerHTML = "";
}

function removeBook(taskElement) {
  const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  taskElement.remove();

  updateDataToStorage();
}

function readAgainBookFromFinishedRead(taskElement) {
  const listNotFinishedReadingBook = document.getElementById(
    NOTFINISHED_READ_BOOK_ID
  );
  const bookTitle = taskElement.querySelector(
    ".book_item > h3 > .bookTitle"
  ).innerText;
  const bookWriter = taskElement.querySelector(
    ".book_item > p > .bookWriter"
  ).innerText;
  const bookYear = taskElement.querySelector(
    ".book_item > p > .bookYear"
  ).innerText;

  const newBook = makeBook(bookTitle, bookWriter, bookYear, false);

  const book = findBookById(taskElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  listNotFinishedReadingBook.append(newBook);
  taskElement.remove();

  updateDataToStorage();
}
