import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App'
import ViewProducts from './pages/product/viewProducts';
import AddProduct from './pages/product/addProduct';
import AddSKU from './pages/sku/addSKU';
import ViewSKUs from './pages/sku/viewSKUs';
//import CurrencyDiff from './pages/currencyDiff';
// import {Customer} from './pages/Customer.tsx';
// import Management from './pages/Management';
import {
  createBrowserRouter,
  RouterProvider,
  // createHashRouter
} from "react-router-dom";
import TopBar from './components/navbar';
import MixMatch from './pages/mixmatch/MixMatch';
// import './styles/index.css'
import Dashboard from './pages/analytic/dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/view-products",
    element: <ViewProducts/>,
  },
  {
    path: "/add-product",
    element: <AddProduct/>,
  },
  {
    path: "/add-sku",
    element: <AddSKU/>,
  },
  {
    path: "/view-skus",
    element: <ViewSKUs/>,
  },
  {
    path: "/navbar",
    element: <TopBar/>,
  },
  {
    path: "/mixmatch",
    element: <MixMatch/>,
  },
  // {
  //   path: "/customer",
  //   element: <Customer/>,
  // },
  // {
  //   path: "/management",
  //   element: <Management/>,
  // },

  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  // {
  //   path: "/currency-div",
  //    element: <CurrencyDiff/>,
  // }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* redux store */}
    <Provider store={store}>
    {/* router provider */}
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
