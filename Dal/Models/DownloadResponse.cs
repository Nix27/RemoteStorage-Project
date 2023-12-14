namespace Dal.Models
{
    public record DownloadResponse
    {
        public string FileName { get; set; } = null!;
        public Stream Content { get; set; } = null!;
        public string ContentType { get; set; } = null!;
    }
}
