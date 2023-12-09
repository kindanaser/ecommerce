import { createBrowserRouter } from "react-router-dom";
import Categories from "../components/web/categories/Categories.jsx";
import Home from "../components/web/home/Home.jsx";
import DashboardLayout from "./DashboardLayout.jsx";
import Layout from "./Layout.jsx";
import Register from "../components/web/register/Register.jsx";
import Login from "../components/web/login/Login.jsx";
import Products from "../components/web/products/Products.jsx";
import Cart from "../components/web/cart/Cart.jsx";
import DashboardHome from "../components/dashboard/home/DashboardHome.jsx";
import DashboardCategories from "../components/dashboard/categories/DashboardCategories.jsx";
import ProtectedRoutes from "../components/web/protectedRoute/ProtectedRoutes.jsx";
import Profile from "../components/web/profile/Profile.jsx";
import SendCode from "../components/web/login/SendCode.jsx";
import ForgetPassword from "../components/web/login/ForgetPassword.jsx";
import CategoriesDetails from "../components/web/categories/categoriesDetails/CategoriesDetails.jsx";
export const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
        {
          path:'register',
          element:<Register />
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'sendcode',
          element:<SendCode/>
        },
        {
          path:'forgetpassword',
          element:<ForgetPassword/>
        },
        {
          //path:'home'
          //path:'/'
          index:true,
          element:<Home />
        },
        {
          path:'categories',
          element:<Categories />
        },
        {
          path:'profile',
          element:<Profile />
        },
        {
          path:'cart',
          element:
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        },
        {
          path:'/products/category/:categoryId',
          element:<CategoriesDetails />
        },
        {
          path:'/products/:productId',
          element:<Products />
        },
        {
          path:'*',
          element:<h2>page not found --- web</h2>
        }
    ]
  },
  {
      path:'/dashboard',
      element:<DashboardLayout />,
      children:[{
      path:'home',
      element:<DashboardHome />
    }
    ,{
      path:'categories',
      element:<DashboardCategories />
    },
    {
      path:'*',
      element:<h2>page not found --- dashboard</h2>
    }
  ]

  }
]);