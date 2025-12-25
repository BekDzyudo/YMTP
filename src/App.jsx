import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/home-page/Home'
import Region from './pages/kasbiy-talim-tashkilotlari/Region'

function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          index:true,
          element: <Home/>,
        },
        {
          path:"region",
          element: <Region/>
        }
      ]
    }
  ])
  return <RouterProvider router={routes}/>
}

export default App
