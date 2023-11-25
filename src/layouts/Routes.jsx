import { createBrowserRouter } from "react-router-dom";
import DashboardCategories from "../components/dashboard/categories/DashboardCategories.jsx";
import DashboardHome from "../components/dashboard/home/DashboardHome.jsx";
import Categories from "../components/web/categories/Categories.jsx";
import Home from "../components/web/home/Home.jsx";
import DashboardLayout from "./DashboardLayout.jsx";
import Layout from "./Layout.jsx";
import Register from "../components/web/register/Register.jsx";

export const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout />,
      children:[
        {
          path:'register',
          element:<Register />
        } ,
        {
          path:'home',
          element:<Home />
        } ,
        {
          path:'categories',
          element:<Categories />
        },
        {
          path:'*',
          element:<h2>Page Not Found -- Web</h2>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<DashboardLayout />,
      children:[
        {
         path:'home',
         element:<DashboardHome />
        },
        {
        path:'categories',
        element:<DashboardCategories />
      },
      {
        path:'*',
        element:<h2>Page Not Found -- Dashboard</h2>
      }
    ]
    }
    ]);