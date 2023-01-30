import { useState } from "react";

interface Book {
  id: number;
  title: string;
  subject: string;
}

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

export default function App() {
  const [books, setBooks] = useState(initialBooks);
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
            <button onClick={() => onClick(book.id)}>Delete</button>{" "}
            {book.title}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h1>Books</h1>
      {renderBooks()}
    </>
  );
}
