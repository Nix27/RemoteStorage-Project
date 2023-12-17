import React from 'react'
import FileDetail from './FileDetail'

const FileDetails = ({ fileDetails, handleToggleFileDetails }) => {
  return (
    <div className='absolute w-[100vw] h-[100vh] z-[10] top-0 left-0 bg-transparent-dark'>
        <div className='absolute bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] md:w-[40%] h-[40%] p-5 rounded-[10px] flex flex-col justify-center'>
            <button className='absolute right-[30px] top-[20px] font-bold text-[1.2rem] transition-all hover:scale-125' onClick={handleToggleFileDetails}>X</button>
            <div>
              <FileDetail detailName={'File name: '} detailValue={fileDetails.fileName} />
              <FileDetail detailName={'Content type: '} detailValue={fileDetails.contentType} />
              <FileDetail detailName={'Content size: '} detailValue={fileDetails.contentSize} />
              <FileDetail detailName={'Created: '} detailValue={fileDetails.created} />
              <FileDetail detailName={'Last modified: '} detailValue={fileDetails.lastModified} />
            </div>
        </div>
    </div>
  )
}

export default FileDetails