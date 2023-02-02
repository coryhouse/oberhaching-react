import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../services/books.service";

export function useBooks() {
  return useQuery(["books"], getBooks, {
    useErrorBoundary: true,
  });
}
