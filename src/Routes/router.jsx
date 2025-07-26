import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import BiodatasPage from "../Components/BioDatas";
import AboutUs from "../Components/AboutUs";
import ContactUs from "../Components/ContactUs";
import DashboardLayout from "../Components/DashboardLayout";
import EditBiodata from "../Components/EditBiodata";
import ViewBiodataPage from "../Components/ViewBiodataPage";
import DBHome from "../Components/DBHome";
import PrivateRoute from "../Provider/PrivateRoute";
import ManageUsers from "../Components/ManageUsers";
import AdminRoute from "../Provider/AdminRoute";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/login",
                Component: Login,
            },
            {
                path: "/register",
                Component: Register,
            },
            {
                path: "/biodatas",
                Component: BiodatasPage,
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
                path: "/dashboard",
                Component: () => (
                    <PrivateRoute>
                        <DashboardLayout />
                    </PrivateRoute>
                ),
                children: [
                    {
                        index: true,
                        Component: DBHome,
                    },
                    {
                        path: "edit-biodata",
                        Component: EditBiodata,
                    },
                    {
                        path: "view-biodata",
                        Component: ViewBiodataPage,
                    },
                    {
                        path: "manage",
                        element: (
                            <AdminRoute>
                                <ManageUsers />
                            </AdminRoute>
                        ),
                    },
                ],
            },
        ],
    },
]);

export default router;