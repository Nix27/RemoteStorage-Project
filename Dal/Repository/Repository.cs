using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Dal.Models;
using Microsoft.AspNetCore.Http;

namespace Dal.Repository
{
    public class Repository : IRepository
    {
        private const string BLOB_CONTAINER_NAME = "remotestorage";
        private const string FORWARD_SLASH = "/";

        private readonly BlobServiceClient _blobServiceClient;
        private readonly BlobContainerClient blobContainerClient;

        public Repository(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
            blobContainerClient = _blobServiceClient.GetBlobContainerClient(BLOB_CONTAINER_NAME);
        }

        public async Task DeleteFileAsync(string fileName)
        {
            string dir = fileName.Split('.')[1];
            string fullFileName = dir + FORWARD_SLASH + fileName;

            var blobClient = blobContainerClient.GetBlobClient(fullFileName);
            await blobClient.DeleteIfExistsAsync();
        }

        public async Task<DownloadResponse?> DownloadFileAsync(string fileName)
        {
            string dir = fileName.Split('.')[1];
            string fullFileName = dir + FORWARD_SLASH + fileName;

            var blobClient = blobContainerClient.GetBlobClient(fullFileName);

            if(await blobClient.ExistsAsync())
            {
                var blobDownloadResult = await blobClient.DownloadContentAsync();

                return new DownloadResponse
                {
                    FileName = fileName,
                    Content = blobDownloadResult.Value.Content.ToStream(),
                    ContentType = blobDownloadResult.Value.Details.ContentType
                };
            }

            return null;
        }

        public async Task<ICollection<string>> GetAllFilesAsync(string? folderName = null)
        {
            var blobs = new List<string>();

            await foreach (var item in blobContainerClient.GetBlobsAsync())
            {
                if (folderName == null)
                {
                    string folder = item.Name[..item.Name.LastIndexOf(FORWARD_SLASH)];
                    if (!blobs.Contains(folder))
                    {
                        blobs.Add(folder);
                    }
                }
                else
                {
                    blobs.Add(item.Name[(item.Name.LastIndexOf(FORWARD_SLASH) + 1)..]);
                }
            }

            return blobs;
        }

        public async Task UploadFileAsync(IFormFile file)
        {
            string extension = Path.GetExtension(file.FileName).TrimStart('.');
            string fileName = Path.GetFileName(file.FileName);

            var blobClient = blobContainerClient.GetBlobClient($"{extension}/{fileName}");
            await blobClient.UploadAsync(file.OpenReadStream(), new BlobHttpHeaders { ContentType = file.ContentType });
        }
    }
}
