import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'

function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          index:true,
          element: <Home/>,
        }
      ]
    }
  ])
  return <RouterProvider router={routes}/>
}

export default App
