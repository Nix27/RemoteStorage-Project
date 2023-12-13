import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar';
import FolderContainer from './pages/FolderContainer';
import FilesContainer from './pages/FilesContainer';
import { getFilesOfFolder } from './data/fileUtils';

import React from 'react'

const router = createBrowserRouter([
  {
    path: "/",
    element: <FolderContainer />
  },
  {
    path: 'files/:folder',
    loader: getFilesOfFolder,
    element: <FilesContainer />
  }
])

const App = () => {
  return (
    <>
        <Navbar />
        <RouterProvider router={router} />
    </>
  )
}

export default App