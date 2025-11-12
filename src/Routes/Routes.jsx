import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/RootLayout";
import CarsDetails from "../Components/CarsDetails";
import Home from "../Components/Home";
import SignUp from "../Components/SignUp";
import Login from "../Layouts/Login";

export const router =createBrowserRouter([
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
                path: "/cars-details/:id",
                Component: CarsDetails,
            },
        ]
    },
    {
        path: "cars-details/:id",
        loader: ({params})=> fetch(`http://localhost:3000/cars/${params.id}`),
        Component: CarsDetails,
    }
])