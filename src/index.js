import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar";
import AroundYou from "./components/Pages/AroundYou";
import Home from "./components/Pages/Home";
import TopArtists from "./components/Pages/TopArtists";
import TopCharts from "./components/Pages/TopCharts";
import './index.css';
import MusicDetails from "./components/Pages/MusicDetails";
import Login from "./components/Pages/Auth/Login";
import App from "./App";

const AppLayout = () => {
  return (
    <>
    <Navbar/>
    <App/>
    <Outlet/>
    </>
  );
}
const router = createBrowserRouter([
   {
    element: <AppLayout />,
    children:[
        {
          path:"/Login",
          element: <Login/>
        },

      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/AroundYou",
        element: <AroundYou/>,
      },
      {
        path: "/TopCharts",
        element: <TopCharts/>,
      },
      {
        path: "/TopArtists",
        element: <TopArtists/>,
      },
      {
        path: "/MusicDetails/:id",
        element: <MusicDetails/>,
      }
    ]
   }

]);


);