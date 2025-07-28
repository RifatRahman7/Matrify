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
import BiodataDetailsPage from "../Components/BiodataDetails";
import CheckoutPage from "../Components/CheckoutPage";
import MyFavourites from "../Components/MyFavourites";
import MyContactRequest from "../Components/MyContactRequest";
import ApprovedPremium from "../Components/ApprovedPremium";
import ApprovedContactRequest from "../Components/ApprovedContactRequest";
import AdminDashboard from "../Components/AdminDashboard";
import GotMarried from "../Components/GotMarried";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            { index: true, Component: Home },
            { path: "/login", Component: Login },
            { path: "/register", Component: Register },
            { path: "/biodatas", Component: BiodatasPage },
            { path: "/about-us", Component: AboutUs },
            { path: "/contact-us", Component: ContactUs },
            {
                path: "/biodatas/:biodataId",
                Component: () => (
                    <PrivateRoute>
                        <BiodataDetailsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/checkout/:biodataId",
                Component: () => (
                    <PrivateRoute>
                        <CheckoutPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard",
                Component: () => (
                    <PrivateRoute>
                        <DashboardLayout />
                    </PrivateRoute>
                ),
                children: [
                    { index: true, Component: DBHome },
                    { path: "edit-biodata", Component: EditBiodata },
                    { path: "view-biodata", Component: ViewBiodataPage },
                    { path: "contact-request", Component: MyContactRequest },
                    { path: "favourites", Component: MyFavourites },
                    { path: "got-married", Component:GotMarried},
                    {
                        path: "manage",
                        element: (
                            <AdminRoute>
                                <ManageUsers />
                            </AdminRoute>
                        ),
                    },
                    {
                        path:"approvedPremium",
                       element: (
                            <AdminRoute>
                                <ApprovedPremium />
                            </AdminRoute>
                        ),
                    },
                     {
                        path:"approvedContactRequest",
                       element: (
                            <AdminRoute>
                                <ApprovedContactRequest />
                            </AdminRoute>
                        ),
                    },
                    {
                       path: "admin-dashboard",
                       element: (
                            <AdminRoute>
                               <AdminDashboard />
                            </AdminRoute>
                        ),
                    },
                    {
                        path: "user-dashboard",
                        element: (
                            <PrivateRoute>
                                <DBHome />
                            </PrivateRoute>
                        ),
                    },

                ],
            },
        ],
    },
]);

export default router;