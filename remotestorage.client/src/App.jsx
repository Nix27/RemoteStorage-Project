import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import FolderContainer from './pages/FolderContainer';
import FilesContainer from './pages/FilesContainer';

import React, { useState } from 'react'

const App = () => {
  const[containerKey, setContainerKey] = useState(crypto.randomUUID())

   function refresh(){
    setContainerKey(crypto.randomUUID())
   }

  return (
    <>
        <Navbar refresh={refresh} />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<FolderContainer key={containerKey + crypto.randomUUID()} />} />
            <Route path="files/:folder" element={<FilesContainer key={containerKey + crypto.randomUUID()} />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App