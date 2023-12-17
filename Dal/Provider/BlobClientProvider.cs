using Azure.Storage.Blobs;

namespace Dal.Provider
{
    public class BlobClientProvider
    {
        private const string BLOB_CONTAINER_NAME = "remotestorage";

        private static BlobServiceClient _blobServiceClient = null!;

        private static readonly Lazy<BlobContainerClient> blobContainerClient = new (() => _blobServiceClient.GetBlobContainerClient(BLOB_CONTAINER_NAME));

        public static BlobContainerClient GetBlobContainerClient() => blobContainerClient.Value;

        public static void InitializeBlobServiceClient(string connectionString)
            => _blobServiceClient ??= new BlobServiceClient(connectionString);
    }
}
