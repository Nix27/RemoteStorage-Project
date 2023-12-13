import React from 'react'
import { useLoaderData } from 'react-router-dom'
import File from '../components/File'
import { MdArrowBackIos } from "react-icons/md";
import { Link } from 'react-router-dom'

const FilesContainer = () => {
  const files = useLoaderData()

  return (
    <div className='mx-5'>
      <div className='mb-3 w-[20px]'>
        <Link to='/'>
          <MdArrowBackIos />
        </Link>
      </div>
      <div className='grid grid-flow-row gap-2'>
        {files.map(file => (
          <File key={crypto.randomUUID()} fileName={file} />
        ))}
      </div>
    </div>
  )
}

export default FilesContainer