import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/RootLayout";
import CarsDetails from "../Pages/CarsDetails";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import BrowseCars from "../Pages/BrowseCars";
import AddCars from "../Pages/AddCars";
import MyBookings from "../Pages/MyBookings";
import PrivateRoute from "./PrivateRoute";
import MyListings from "../Pages/MyListings";
import ErrorPage from "../Pages/ErrorPage";
import AboutUs from "../Pages/AboutUs";
import Services from "../Pages/Services";
import ServiceDetails from "../Pages/ServiceDetails";
import ContactUs from './../Pages/ContactUs';
import DashboardLayouts from "../Layouts/DashboardLayouts";
import Privacy from "../Pages/Privacy";

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
        path: "/services",
        Component: Services,
      },
      {
        path: "/services/:id",
        Component: ServiceDetails,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/privacy",
        Component: Privacy,
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

    path: "/dashboard",
    element: <PrivateRoute><DashboardLayouts></DashboardLayouts></PrivateRoute>,
    children: [
      {
        path: "my-bookings",
        Component: MyBookings,
      },
      {
        path: "my-listings",
        Component: MyListings,
      },
      {
        path: "add-car",
        Component: AddCars,
      },
    ]
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
