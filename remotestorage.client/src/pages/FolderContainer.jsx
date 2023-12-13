import React, { useEffect, useState } from 'react'
import { getFolders } from '../data/fileUtils'
import FolderCard from '../components/FolderCard'
import { Link } from 'react-router-dom'
import UploadDialog from '../components/UploadDialog'

const FolderContainer = () => {
  const[folders, setFolders] = useState([])
  const[toggleUploadDialog, setToggleUploadDialog] = useState(false)

  useEffect(() => {
    getFolders().then(res => setFolders(res))
  }, [])

  function handleToogleUploadDialog(){
    setToggleUploadDialog(prev => !prev)
  }
    
  return (
    <div className='mx-5'>
      <div className='flex justify-end'>
        <button className='py-2 px-5 bg-blue-400' onClick={handleToogleUploadDialog}>Upload</button>
      </div>
      <div className=' grid grid-cols-4'>
        {folders.length < 1 ? <p>Loading...</p> :
            folders.map(folder => (
              <Link key={crypto.randomUUID()} to={`files/${folder}`}>
                <FolderCard folderName={folder} />
              </Link>
            ))
        }
      </div>
      {toggleUploadDialog && <UploadDialog handleToogleUploadDialog={handleToogleUploadDialog} />}
    </div>
  )
}

export default FolderContainer