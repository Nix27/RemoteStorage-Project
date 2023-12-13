import React from 'react'
import { useLoaderData } from 'react-router-dom'
import File from '../components/File'

const FilesContainer = () => {
  const files = useLoaderData()

  return (
    <div className='grid grid-flow-row gap-2 mx-5'>
        {files.map(file => (
          <File key={crypto.randomUUID()} fileName={file} />
        ))}
    </div>
  )
}

export default FilesContainer