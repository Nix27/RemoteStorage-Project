import React from 'react'
import { fileImage } from '../assets'
import { MdOutlineFileDownload } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { downloadFile, deleteFile } from '../data/fileUtils';

const File = ({ fileName }) => {
  return (
    <div className='flex justify-between bg-slate-200 p-5'>
      <div className='w-[50px] h-[50px] flex items-center gap-2'>
        <img src={fileImage} alt='file image' />
        <span>{fileName}</span>
      </div>
      <div className='flex items-center gap-5'>
        <button onClick={() => downloadFile(fileName)}>
          <MdOutlineFileDownload className='text-[1.5rem] transition-all hover:text-[1.7rem] hover:text-blue-400' />
        </button>
        <button onClick={() => deleteFile(fileName)}>
          <MdDelete className='text-[1.5rem] transition-all hover:text-[1.7rem] hover:text-red-500' />
        </button>
      </div>
    </div>
  )
}

export default File