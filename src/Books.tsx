import { Book } from "./types/Book.types";

type BookProps = {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
};

export default function Books({ books, setBooks }: BookProps) {
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
      {renderBooks()}
    </>
  );
}
