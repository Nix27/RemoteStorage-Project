import React from 'react'

const FileDetail = ({ detailName, detailValue }) => {
  return (
    <div className='flex gap-3'>
        <span>{detailName}</span>
        <span>{detailValue}</span>
    </div>
  )
}

export default FileDetail