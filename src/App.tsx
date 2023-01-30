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

  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    setBooks([]);
  }

  return (
    <>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <button onClick={onClick}>Delete</button> {book.title}
          </li>
        ))}
      </ul>
    </>
  );
}
