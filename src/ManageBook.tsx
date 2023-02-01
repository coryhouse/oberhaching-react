import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "./services/books.service";
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
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBook((currentBook) => ({
      ...currentBook,
      // Computed property name using the input's id.
      [event.target.id]: event.target.value,
    }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent page reload.
    setIsSaving(true);
    const savedBook = await addBook(book);
    setIsSaving(false);
    setBooks([...books, savedBook]);
    navigate("/");
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
      <Button type="submit" variant="contained" disabled={isSaving}>
        {isSaving ? "Saving..." : "Add Book"}
      </Button>

      {isSaving && (
        <Box>
          <CircularProgress aria-label="Saving" />
        </Box>
      )}
    </form>
  );
}
