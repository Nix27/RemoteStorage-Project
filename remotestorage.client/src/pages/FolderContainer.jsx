import React, { useEffect, useState } from 'react'
import { getFolders } from '../data/fileUtils'
import FolderCard from '../components/FolderCard'
import { Link } from 'react-router-dom'

const FolderContainer = () => {
  const[folders, setFolders] = useState([])
  
  useEffect(() => {
    getFolders().then(res => setFolders(res))
  }, [])

  return (
    <div className='mx-5'>
      <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 xl:grid-cols-7 gap-3 md:gap-5'>
        {folders.length < 1 ? <p>Loading...</p> :
            folders.map(folder => (
              <Link key={crypto.randomUUID()} to={`files/${folder}`}>
                <FolderCard folderName={folder} />
              </Link>
            ))
        }
      </div>
    </div>
  )
}

export default FolderContainer