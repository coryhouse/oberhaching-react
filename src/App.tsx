import { useState } from "react";

interface Book {
  id: number;
  title: string;
  subject: string;
}

type NewBook = Omit<Book, "id">;

let initialBooks: Book[] = [
  {
    id: 1,
    title: "Essentialism",
    subject: "Productivity",
  },
  {
    id: 2,
    title: "The 4-Hour Workweek",
    subject: "Productivity",
  },
];

const newBook: NewBook = {
  title: "",
  subject: "",
};

export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const [book, setBook] = useState(newBook);

  // Keeping here for reference
  // function renderBook(book: Book) {
  //   return <li key={book.id}>{book.title}</li>;
  // }

  function onClick(bookId: number) {
    // Using functional form of setState to avoid stale state
    // React guarantees that currentBooks will be up to date.
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== bookId)
    );
  }

  function renderBooks() {
    if (books.length === 0) return <p>No books found.</p>;

    return (
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <button
              aria-label={"Delete " + book.title}
              onClick={() => onClick(book.id)}
            >
              Delete
            </button>{" "}
            {book.title}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h1>Books</h1>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
        </div>

        <div>
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" />
        </div>
      </form>
      {renderBooks()}
    </>
  );
}
