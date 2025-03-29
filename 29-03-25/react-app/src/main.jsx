import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Name from './components/name.jsx'
import { Products } from './components/Products.jsx'
import Users from './components/User.jsx'
import './index.css'

const router = createBrowserRouter([{
  path: "/",
  element: <App/>
}, {
  path: "/name",
  element: <Name/>
}, {
  path: "/user/:id",
  element: <Users/>
}, {
  path: "/products/:id",
  element: <Products/>
}])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
    {/* <Name /> */}
    {/* <Users /> */}
    {/* <Products /> */}

  </StrictMode>,
)
