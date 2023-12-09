import { RouterProvider} from "react-router-dom";
import { CreateContextProvider } from "./components/web/context/Cart.jsx";
import { router } from "./layouts/Routes.jsx";
import { UserContext } from "./components/web/context/User.jsx";
import { useContext } from "react";
export default function App() {
  const {setUserToken} = useContext(UserContext);
  if(localStorage.getItem("userToken") != null){
   setUserToken(localStorage.getItem("userToken"));
  }
  return (
       <CreateContextProvider>
       <RouterProvider router={router} />
       </CreateContextProvider>
  )
}
