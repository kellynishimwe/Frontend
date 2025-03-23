import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Import components
import Home from "../home/Home";
import Shop from "../shop/Shop";
import SingleBook from "../components/SingleBook";
import Signup from "../components/Signup";

// Dashboard imports
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import SideBar from "../dashboard/SideBar";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import About from "../about/About";
import Blog from "../blog/Blog";
import NotFound from "../components/NotFound";

// Fetching Book Data Before Edit Page Loads
const API_URL = import.meta.env.VITE_API_URL;

const fetchBookData = async ({ params }) => {
  try {
    const res = await fetch(`${API_URL}/books/${params.id}`);
    if (!res.ok) throw new Error("Failed to load book data");
    return res.json();
  } catch (error) {
    console.error("Error loading book:", error);
    return null;
  }
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/singlebook", element: <SingleBook /> },
      { path: "/about", element: <About/> },
      { path: "/blog", element: <Blog/> },


    ],
  },
  {
    path: "/admin/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
  },
  {
    path: "/admin/upload",
    element: <PrivateRoute><UploadBook /></PrivateRoute>,
  },
  {
    path: "/admin/manage",
    element: <PrivateRoute><ManageBooks /></PrivateRoute>,
  },
  {
    path: "/admin/sidebar",
    element: <PrivateRoute><SideBar /></PrivateRoute>,
  },
  {
    path: "/admin/edit-books/:id",
    element: <PrivateRoute><EditBooks /></PrivateRoute>,
    loader: fetchBookData,
  },
  
  { path: "/sign-up", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "*", element: <NotFound /> }

]);

export default router;
