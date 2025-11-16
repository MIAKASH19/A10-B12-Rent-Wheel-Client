import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/RootLayout";
import CarsDetails from "../Components/CarsDetails";
import Home from "../Components/Home";
import SignUp from "../Components/SignUp";
import Login from "../Layouts/Login";
import BrowseCars from "../Components/BrowseCars";
import AddCars from "../Components/AddCars";
import MyBookings from "../Components/MyBookings";
import PrivateRoute from "./PrivateRoute";
import MyListings from "../Components/MyListings";
import ErrorPage from "../Components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/sign-up",
        Component: SignUp,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/browse-cars",
        Component: BrowseCars,
      },
      {
        path: "/add-car",
        element: (
          <PrivateRoute>
            <AddCars></AddCars>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings></MyListings>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "/cars-details/:id",
        element: (
          <PrivateRoute>
            <CarsDetails></CarsDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
