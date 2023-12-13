export async function getFolders(){
    let folders = []

    const res = await fetch('/filestorage/getall')
    const data = await res.json()

    data.forEach(folder => folders.push(folder))

    return folders
}

export async function getFilesOfFolder({ params }){
    let files = []

    const res = await fetch(`/filestorage/getall/${params.folder}`)
    const data = await res.json()

    data.forEach(file => files.push(file))

    return files
}

export function uploadFile(file){
    const formData = new FormData()
    formData.append('file', file)

    fetch('/filestorage/uploadfile', {
        method: 'POST',
        body: formData
    })
    .then(res => console.log(res))
    .catch(err => console.log("Upload failed: " + err))
}

export function downloadFile(fileName){
    fetch(`/filestorage/downloadfile/${fileName}`)
    .then(res => res.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]))

        const link = document.createElement('a')
        link.href = url
        link.download = fileName

        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)
    })
    .catch(err => console.log('Download error: ' + err))
}

export function deleteFile(fileName){
    fetch(`/filestorage/deletefile/${fileName}`, { method: 'DELETE' })
    .then(console => console.log('deleted'))
    .catch(err => console.log(err))
}