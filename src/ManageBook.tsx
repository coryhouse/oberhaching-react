import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "./services/books.service";
import { NewBook } from "./types/Book.types";

const newBook: NewBook = {
  title: "",
  subject: "",
};

type Errors = Partial<NewBook>;

// Union type
type Status = "idle" | "submitting" | "submitted";

export default function ManageBook() {
  const [book, setBook] = useState(newBook);
  const [status, setStatus] = useState<Status>("idle");
  const navigate = useNavigate();

  const errors = getErrors();

  function getErrors() {
    const errors: Errors = {};
    if (!book.title) {
      errors.title = "Title is required.";
    }
    if (!book.subject) {
      errors.subject = "Subject is required.";
    }
    return errors;
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBook((currentBook) => ({
      ...currentBook,
      // Computed property name using the input's id.
      [event.target.id]: event.target.value,
    }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent page reload.
    const errorsExist = Object.keys(errors).length > 0; // If the errors object has any properties, then there are errors.
    if (errorsExist) {
      setStatus("submitted");
      return;
    }
    setStatus("submitting");
    const savedBook = await addBook(book);
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
          error={status === "submitted" && Boolean(errors.title)}
          helperText={status === "submitted" && errors.title}
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
      <Button
        type="submit"
        variant="contained"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Saving..." : "Add Book"}
      </Button>

      {status === "submitting" && (
        <Box>
          <CircularProgress aria-label="Saving" />
        </Box>
      )}
    </form>
  );
}
