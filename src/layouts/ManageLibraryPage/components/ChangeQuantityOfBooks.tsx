import { useEffect, useState } from "react";
import { BookModel } from "../../../models/BookModel";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { Pagination } from "../../utils/Pagination";
import { ChangeQuantityOfBook } from "./ChangeQuantityOfBook";


export const ChangeQuantityOfBooks = () => {
  const { authState } = useOktaAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  
  const [books, setBooks] = useState<BookModel[]>([]);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);

  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [booksPerPage] = useState(5);

  
  const [bookDelete, setBookDelete] = useState(false); 

  useEffect(() => {
    const fetchBooks = async () => {
      const url: string = `${process.env.REACT_APP_API}/books?page=${
        currentPage - 1
      }&size=${booksPerPage}`;
      if (authState?.isAuthenticated) {
        const booksResponse = await fetch(url);
        if (!booksResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const responseJson = await booksResponse.json();
        setBooks(responseJson._embedded.books);
        setTotalAmountOfBooks(responseJson.page.totalElements);
        setTotalPages(responseJson.page.totalPages);
      setIsLoading(false);
      }
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [authState, currentPage, bookDelete]);

  
  const deleteBook = () => {
    setBookDelete(!bookDelete);
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>s
      </div>
    );
  }
  const indexOfLastBook: number = currentPage * booksPerPage; 
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage; 
  const lastItem: number =
    currentPage * booksPerPage <= totalAmountOfBooks
      ? currentPage * booksPerPage
      : totalAmountOfBooks; 
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      {totalAmountOfBooks > 0 ? (
        <>
          <div className="mt-3">
            <h3>Number of results: {totalAmountOfBooks}</h3>
          </div>
          <p>
            {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
          </p>
          
          {books.map((book) => (
            <ChangeQuantityOfBook
              key={book.id}
              book={book}
              deleteBook={deleteBook}
            />
          ))}
        </>
      ) : (
        <>
          <h5>Added a book before changing quantity</h5>
        </>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
