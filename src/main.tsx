import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root.tsx'
import { Main } from './pages/Main.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { Login } from './pages/Login.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [ // Sisäkkäiset polut, ks. Outlet-komponentti Rootissa: https://reactrouter.com/en/main/start/tutorial#nested-routes
      {
        path: "/",
        element: <Main/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/login",
        element: <Login/>
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
