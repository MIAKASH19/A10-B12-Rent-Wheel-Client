import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/RootLayout";
import CarsDetails from "../Components/CarsDetails";
import Home from "../Components/Home";

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