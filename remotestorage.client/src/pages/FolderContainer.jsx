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
      <div className='flex flex-wrap gap-5'>
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