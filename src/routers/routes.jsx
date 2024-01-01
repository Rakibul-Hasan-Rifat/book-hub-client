import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AddBook from "../pages/AddBook/AddBook";
import BooksOfSameType from "../pages/BooksOfSameType/BooksOfSameType";
import AllBooks from "../pages/AllBooks/AllBooks";
import BookDetails from "../pages/BookDetails/BookDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UpdateBook from "../pages/UpdateBook/UpdateBook";
import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
      <Route
        path="/"
        element={<Home />}
        loader={() => fetch('https://book-hub-server-lilac.vercel.app/bookTypes')}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/books"
        element={<PrivateRoutes><AllBooks /></PrivateRoutes>}
      />
      <Route
        path="/books/:id/details"
        element={<PrivateRoutes><BookDetails /></PrivateRoutes>}
        loader={({ params }) => fetch(`https://book-hub-server-lilac.vercel.app/books/${params.id}/details`)}
      />
      <Route
        path="/books/:id/update"
        element={<PrivateRoutes><UpdateBook /></PrivateRoutes>}
        loader={() => fetch('https://book-hub-server-lilac.vercel.app/bookTypes')}
      />
      <Route
        path="/books/:type"
        element={<PrivateRoutes><BooksOfSameType /></PrivateRoutes>}
        loader={({ params }) => fetch(`https://book-hub-server-lilac.vercel.app/books/${params.type}`)}
      />
      <Route
        path="/addBook"
        element={<PrivateRoutes><AddBook /></PrivateRoutes>}
      />
      <Route
        path="/borrowedBooks"
        element={<PrivateRoutes><BorrowedBooks /></PrivateRoutes>}
      />
    </Route>

  )
);

export default router;