import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/RootLayout";
import CarsDetails from "../Components/CarsDetails";
import Home from "../Components/Home";
import SignUp from "../Components/SignUp";
import Login from "../Layouts/Login";
import BrowseCars from "../Components/BrowseCars";
import AddCars from "../Components/AddCars";
import MyBookings from "../Components/MyBookings";

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
        Component: AddCars,
      },
      {
        path: "/my-bookings",
        Component: MyBookings,
      },
      {
        path: "/cars-details/:id",
        Component: CarsDetails,
      },
      {
        path: "cars-details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/cars/${params.id}`),
        Component: CarsDetails,
      },
    ],
  },
]);
