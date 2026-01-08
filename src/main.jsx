import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
// import Sidebar from './Components/Sidebar.jsx';
import Root from './Components/Root.jsx';
import Home from './Components/Home.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Customers from './Components/Customers.jsx';
import DashboardOriginal from './Pages/DashboardOrginal.jsx';
import Products from './Components/Products.jsx';
import Income from './Pages/Income.jsx';
import Promote from './Pages/Promote.jsx';
import Help from './Pages/Help.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:
      [
        { index: true, Component: DashboardOriginal },
        {
          path: "Dashboard", Component: DashboardOriginal
        }, {
          path: "Products", Component: Products
        },
        {
          path: "Customers", Component: Customers
        }, {
          path: "Income", Component: Income
        }, {
          path: 'Promote', Component: Promote
        }, {
          path: "Help", Component: Help
        }
      ]
  },]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
