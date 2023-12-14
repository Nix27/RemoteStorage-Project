namespace Dal.Models
{
    public class FileDetails
    {
        public string FileName { get; set; } = null!;
        public string ContentType { get; set; } = null!;
        public long ContentSize { get; set; }
        public DateTimeOffset Created { get; set; }
        public DateTimeOffset LastModified { get; set; }
    }
}
