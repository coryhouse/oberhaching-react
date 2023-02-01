import { Box, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { deleteBook } from "./services/books.service";
import { Book } from "./types/Book.types";

type BookProps = {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  isLoading: boolean;
};

export default function Books({ books, setBooks, isLoading }: BookProps) {
  // Keeping here for reference
  // function renderBook(book: Book) {
  //   return <li key={book.id}>{book.title}</li>;
  // }

  function onClick(bookId: number) {
    // Optimistic delete. TODO: handle errors
    deleteBook(bookId);
    // Using functional form of setState to avoid stale state
    // React guarantees that currentBooks will be up to date.
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== bookId)
    );
  }

  function renderBooks() {
    if (isLoading)
      return (
        <Box>
          <CircularProgress aria-label="Loading books" />
        </Box>
      );

    if (books.length === 0) return <p>No books found.</p>;

    return (
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Button
              variant="text"
              aria-label={"Delete " + book.title}
              onClick={() => onClick(book.id)}
            >
              Delete
            </Button>{" "}
            {book.title}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h1>Books</h1>
      <Link to="/book">Add Book</Link>
      {renderBooks()}
    </>
  );
}
