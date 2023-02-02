import { Box, Button, CircularProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useBooks } from "./hooks/useBooks";
import { deleteBook } from "./services/books.service";

export default function Books() {
  const bookQuery = useBooks();
  const queryClient = useQueryClient();
  const deleteBookMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      // Refetch books after delete
      queryClient.invalidateQueries({ queryKey: ["books"] });
      enqueueSnackbar("Book deleted", { variant: "success" });
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  // Keeping here for reference
  // function renderBook(book: Book) {
  //   return <li key={book.id}>{book.title}</li>;
  // }

  function onClick(bookId: number) {
    // Optimistic delete. TODO: handle errors
    deleteBookMutation.mutate(bookId);
    // Using functional form of setState to avoid stale state
    // React guarantees that currentBooks will be up to date.
    // setBooks((currentBooks) =>
    //   currentBooks.filter((book) => book.id !== bookId)
    // );
  }

  function renderBooks() {
    // Type narrowing - Note that bookQuery.data is always defined below.
    if (bookQuery.isLoading || bookQuery.data === undefined) {
      return (
        <Box>
          <CircularProgress aria-label="Loading books" />
        </Box>
      );
    }

    if (bookQuery.data.length === 0) return <p>No books found.</p>;

    return (
      <ul>
        {bookQuery.data.map((book) => (
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
      {bookQuery.isRefetching && (
        <p>
          Refetching...
          <CircularProgress />
        </p>
      )}
    </>
  );
}
