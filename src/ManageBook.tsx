import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Book, NewBook } from "./types/Book.types";

const newBook: NewBook = {
  title: "",
  subject: "",
};

type ManageBookProps = {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
};

export default function ManageBook({ books, setBooks }: ManageBookProps) {
  const [book, setBook] = useState(newBook);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBook((currentBook) => ({
      ...currentBook,
      // Computed property name using the input's id.
      [event.target.id]: event.target.value,
    }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent page reload.
    setBooks([
      ...books,
      // HACK: This is not a good way to generate a unique id
      { title: book.title, subject: book.subject, id: books.length + 1 },
    ]);
    // Reset form after submit
    setBook(newBook);
  }

  return (
    <form onSubmit={onSubmit}>
      <Box>
        <TextField
          id="title"
          label="Title"
          value={book.title}
          margin="normal"
          onChange={onChange}
        />
      </Box>

      <Box>
        <TextField
          id="subject"
          label="Subject"
          value={book.subject}
          margin="normal"
          onChange={onChange}
        />
      </Box>
      <Button type="submit" variant="contained">
        Add Book
      </Button>
    </form>
  );
}
