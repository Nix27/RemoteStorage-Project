using Dal.Repository;
using Microsoft.AspNetCore.Mvc;

namespace RemoteStorage.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FileStorageController(IRepository repository) : ControllerBase
    {
        private readonly IRepository _repository = repository;

        [HttpGet("getall/{folderName?}")]
        public async Task<IActionResult> GetAll(string? folderName = null)
        {
            return Ok(await _repository.GetAllFilesAsync(folderName));
        }

        [HttpGet("getfiledetails/{fileName}")]
        public async Task<IActionResult> GetFileDetails(string fileName)
        {
            return Ok(await _repository.GetFileDetails(fileName));
        }

        [HttpPost("uploadfile")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            await _repository.UploadFileAsync(file);
            return Ok(new { message = "success" });
        }

        [HttpGet("downloadfile/{fileName}")]
        public async Task<IActionResult> DownloadFile(string fileName)
        {
            var downloadResponse = await _repository.DownloadFileAsync(fileName);

            if (downloadResponse == null) return BadRequest();

            return File(downloadResponse.Content, downloadResponse.ContentType, downloadResponse.FileName);
        }

        [HttpDelete]
        [Route("deletefile/{fileName}")]
        public async Task<IActionResult> DeleteFile(string fileName)
        {
            await _repository.DeleteFileAsync(fileName);
            return Ok(new { message = "success" });
        }
    }
}
