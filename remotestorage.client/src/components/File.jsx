import React, { useEffect, useState } from 'react'
import { fileImage } from '../assets'
import { MdOutlineFileDownload } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { downloadFile, deleteFile, getFileDetails } from '../data/fileUtils';
import FileDetails from './FileDetails';

const File = ({ fileName, fetchFiles }) => {
  const[toggleFileDetails, setToggleFileDetails] = useState(false)
  const[fileDetails, setFileDetails] = useState(null)

  useEffect(() => {
    getFileDetails(fileName)
    .then(res => setFileDetails(res))
  }, [])

  function handleToggleFileDetails() {
    setToggleFileDetails(prev => !prev)
  }

  return (
    <div className='flex justify-between bg-slate-200 p-5'>
      <div className='w-[50px] h-[50px] flex items-center gap-2'>
        <img src={fileImage} alt='file image' />
        <button className='transition-all hover:text-blue-500' onClick={handleToggleFileDetails}>{fileName}</button>
      </div>
      <div className='flex items-center gap-5'>
        <button onClick={() => downloadFile(fileName)}>
          <MdOutlineFileDownload className='text-[1.5rem] transition-all hover:text-[1.7rem] hover:text-blue-400' />
        </button>
        <button onClick={() => deleteFile(fileName, fetchFiles)}>
          <MdDelete className='text-[1.5rem] transition-all hover:text-[1.7rem] hover:text-red-500' />
        </button>
      </div>
      {toggleFileDetails && <FileDetails fileDetails={fileDetails} handleToggleFileDetails={handleToggleFileDetails} />}
    </div>
  )
}

export default File