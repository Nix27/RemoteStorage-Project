import React, { useState } from 'react'
import UploadDialog from '../components/UploadDialog'
import { GoUpload } from "react-icons/go";

const Navbar = () => {
  const[toggleUploadDialog, setToggleUploadDialog] = useState(false)

  function handleToogleUploadDialog(){
    setToggleUploadDialog(prev => !prev)
  }

  return (
    <nav className='w-full bg-slate-500 py-5 px-5 mb-10 flex justify-between'>
        <h2 className='text-blue-400 text-[1.3rem]'>Remote Storage</h2>
        <button className='py-2 px-7 bg-blue-400 flex gap-3 items-center rounded-[20px] transition-all hover:scale-105' onClick={handleToogleUploadDialog}><GoUpload /> Upload</button>
        {toggleUploadDialog && <UploadDialog handleToogleUploadDialog={handleToogleUploadDialog} />}
    </nav>
  )
}

export default Navbar