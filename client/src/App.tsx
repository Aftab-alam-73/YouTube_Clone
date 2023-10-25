import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Video from "./pages/video/Video";
import Signin from "./pages/signin/Signin";
import Upload from "./pages/upload/Upload";
import { useSelector } from "react-redux";
import './index.css'
import Profile from "./components/profile/Profile";

const Layout=()=>{
  return (
    <main >
      <Navbar/>
      <Outlet/>
    </main>
  )
}

const App = () => {
  const {mode}=useSelector((state:any)=>state.darkMode)
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children:[
        {
          path: "/",
          element:<Home/>
        },
        {
          path: "/:type",
          element:<Home/>
        }
        ,{
          path:"/video/:videoId",
          element:<Video/>
        },{
          path:"/profile/:profileId",
          element:<Profile/>
        }
      ]
    },
    {
      path: "/signin",
      element:<Signin/>,
      
    },
    {
      path:"/upload",
      element:<Upload/>
    }
  ]);
  return (
    <div className={mode? "dark":"light"} >
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
