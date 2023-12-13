using Dal.Models;
using Microsoft.AspNetCore.Http;

namespace Dal.Repository
{
    public interface IRepository
    {
        Task<ICollection<string>> GetAllFilesAsync(string? folderName = null);
        Task UploadFileAsync(IFormFile file);
        Task<DownloadResponse?> DownloadFileAsync(string fileName);
        Task DeleteFileAsync(string blobName);
    }
}
