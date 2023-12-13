using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Models
{
    public class DownloadResponse
    {
        public string FileName { get; set; } = null!;
        public Stream Content { get; set; } = null!;
        public string ContentType { get; set; } = null!;
    }
}
