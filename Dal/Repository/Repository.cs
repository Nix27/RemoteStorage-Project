using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Dal.Models;
using Microsoft.AspNetCore.Http;

namespace Dal.Repository
{
    public class Repository : IRepository
    {
        private const string BLOB_CONTAINER_NAME = "remotestorage";
        private const string FORWARDSLASH = "/";

        private readonly BlobServiceClient _blobServiceClient;
        private readonly BlobContainerClient blobContainerClient;

        public Repository(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
            blobContainerClient = _blobServiceClient.GetBlobContainerClient(BLOB_CONTAINER_NAME);
        }

        public async Task DeleteFileAsync(string fileName)
        {
            string dir = Path.GetExtension(fileName).TrimStart('.');
            string fullFileName = dir + FORWARDSLASH + fileName;

            var blobClient = blobContainerClient.GetBlobClient(fullFileName);
            await blobClient.DeleteIfExistsAsync();
        }

        public async Task<DownloadResponse> DownloadFileAsync(string fileName)
        {
            string dir = Path.GetExtension(fileName).TrimStart('.');
            string fullFileName = dir + FORWARDSLASH + fileName;

            var blobClient = blobContainerClient.GetBlobClient(fullFileName);

            var blobDownloadResult = await blobClient.DownloadContentAsync();

            return new DownloadResponse
            {
                FileName = fileName,
                Content = blobDownloadResult.Value.Content.ToStream(),
                ContentType = blobDownloadResult.Value.Details.ContentType
            };
        }

        public async Task<ICollection<string>> GetAllFilesAsync(string? folderName = null)
        {
            var blobs = new HashSet<string>();

            await foreach (var item in blobContainerClient.GetBlobsAsync(prefix: folderName))
            {
                if (folderName == null)
                {
                    string folder = item.Name[..item.Name.LastIndexOf(FORWARDSLASH)];
                    blobs.Add(folder);
                }
                else
                {
                    string fileName = item.Name[(item.Name.LastIndexOf(FORWARDSLASH) + 1)..];
                    blobs.Add(fileName);
                }
            }

            return blobs;
        }

        public async Task<FileDetails> GetFileDetails(string fileName)
        {
            string dir = Path.GetExtension(fileName).TrimStart('.');
            string fullFileName = dir + FORWARDSLASH + fileName;

            var blobClient = blobContainerClient.GetBlobClient(fullFileName);

            var blobDownloadResult = await blobClient.DownloadContentAsync();

            return new FileDetails
            {
                FileName = fileName,
                ContentType = blobDownloadResult.Value.Details.ContentType,
                ContentSize = blobDownloadResult.Value.Details.ContentLength,
                Created = blobDownloadResult.Value.Details.CreatedOn,
                LastModified = blobDownloadResult.Value.Details.LastModified
            };
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
