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

export async function getFileDetails(fileName){
    const res = await fetch(`/filestorage/getfiledetails/${fileName}`)
    return await res.json()
}

export function uploadFile(file){
    const formData = new FormData()
    formData.append('file', file)

    fetch('/filestorage/uploadfile', {
        method: 'POST',
        body: formData
    })
    .then(() => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully uploaded file!",
            showConfirmButton: false,
            timer: 1500
          });
    })
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
    Swal.fire({
        title: "Think twice!!",
        text: "Your problem if you delete wrong :)",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/filestorage/deletefile/${fileName}`, { method: 'DELETE' })
            .then(() => {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
            })
            .catch(err => console.log(err))
        }
      });
}