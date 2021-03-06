const STORAGE_BOOKS_KEY = "MY_BOOKS";

let books = [];
let searchBooks = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Your Browser is not support local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_BOOKS_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_BOOKS_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

function composeBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

function findBookById(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }

  return null;
}

function findBookByTitle(bookTitle) {
  searchBooks = [];
  if (bookTitle) {
    for (book of books) {
      if (book.title === bookTitle) searchBooks.push(book);
    }
    return searchBooks;
  } else if (bookTitle === null) {
    return books;
  }
  
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;
  }

  return -1;
}

function refreshDataFromBooks() {
  const listNotFinishedReadingBook = document.getElementById(
    NOTFINISHED_READ_BOOK_ID
  );
  const listFinishedReadingBook = document.getElementById(
    FINISHED_READ_BOOK_ID
  );

  for (book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      listFinishedReadingBook.append(newBook);
    } else {
      listNotFinishedReadingBook.append(newBook);
    }
  }
}
