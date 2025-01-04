import React from "react";
import ReactDOM from "react-dom/client";
import AddDestination from "./routes/AddDestination/AddDestination";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import "./index.css";
import Landing from "./routes/Landing";
//import reportWebVitals from "./reportWebVitals";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DestinationDetails from "./routes/DestinationDetails/DestinationDetails";
import UserLogin from "./routes/UserLogIn/UserLogin";
import AuthProvider from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/destinations",
    element: <AddDestination />,
  },
  {
    path: "/destination",
    element: <DestinationDetails />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
