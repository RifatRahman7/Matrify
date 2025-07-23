import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import BiodatasPage from "../Components/BioDatas";
import AboutUs from "../Components/AboutUs";

const router = createBrowserRouter([
    {
        path: "/",
        Component:Root,
        children:[
            {
                index: true,
                Component:Home
            },
            {
                path: "/login",
                Component:Login
            },
            {
                path: "/register",
                Component:Register
            },
             {
                path: "/biodatas",
                Component:BiodatasPage
            },
            {
                path: "/about-us",
                Component:AboutUs
            },
        ]
    },
]);

export default router;