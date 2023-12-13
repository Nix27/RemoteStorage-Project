import React from 'react'
import { folderImage } from '../assets'

const FolderCard = ({ folderName }) => {
  return (
    <div className='flex flex-col w-[200px] h-[200px] p-3 rounded-[20px] transition-all hover:bg-blue-300 hover:cursor-pointer hover:scale-105'>
        <img src={folderImage} alt="folder image" />
        <div className='flex'>
            <span className='px-3 text-[1.1rem]'>{folderName}</span>
        </div>
    </div>
  )
}

export default FolderCard