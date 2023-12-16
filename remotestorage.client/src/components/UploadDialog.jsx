import React, { useState } from 'react'
import { uploadFile } from '../data/fileUtils'

const UploadDialog = ({ handleToogleUploadDialog, refresh }) => {
  const[file, setFile] = useState(null)

  function handleSubmit(e) {
    e.preventDefault();
    uploadFile(file, refresh)
    handleToogleUploadDialog()
  }

  return (
    <div className='absolute w-[100vw] h-[100vh] z-[10] top-0 left-0 bg-transparent-dark'>
        <div className='absolute bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[40%] h-[40%] p-5 rounded-[10px]'>
            <button className='absolute right-[30px] top-[20px] font-bold text-[1.2rem] transition-all hover:scale-125' onClick={handleToogleUploadDialog}>X</button>
            <form onSubmit={handleSubmit} className='flex flex-col w-full h-full items-center gap-3 justify-center'>
                <label htmlFor='file'>File:</label>
                <input type='file' name='file' id='file' required onChange={e => setFile(e.target.files[0])} className='border border-black' />
                <button type='submit' className='bg-blue-400 py-2 px-5 rounded-[20px] transition-all hover:scale-105'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default UploadDialog