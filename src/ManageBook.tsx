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
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" onChange={onChange} value={book.title} />
      </div>

      <div>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          onChange={onChange}
          value={book.subject}
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}
