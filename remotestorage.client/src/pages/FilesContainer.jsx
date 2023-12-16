import React, { useEffect, useState } from 'react'
import File from '../components/File'
import { MdArrowBackIos } from "react-icons/md";
import { Link, useParams, redirect } from 'react-router-dom'
import { getFilesOfFolder } from '../data/fileUtils';

const FilesContainer = () => {
  const { folder } = useParams()
  const[files, setFiles] = useState(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  function fetchFiles(){
    getFilesOfFolder(folder)
    .then(files => setFiles(files))
    .catch(err => console.log(err))
  }
  
  if(files === null){
    return <p>Loading...</p>
  }else if(files.length < 1){
    window.location.href = "/"
  } else{
    return (
      <div className='mx-5'>
        {files.length < 1 ? <p>Loading...</p> : 
          <>
            <div className='mb-5 w-[20px]'>
              <Link to='/'>
                <MdArrowBackIos className='text-[1.5rem] transition-all hover:scale-110' />
              </Link>
            </div>
            <div className='grid grid-flow-row gap-2'>
              {files.map(file => (
                <File key={crypto.randomUUID()} fileName={file} fetchFiles={fetchFiles} />
              ))}
            </div>
          </>
        }
      </div>
    )
  }
}

export default FilesContainer