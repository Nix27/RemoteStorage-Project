using Dal.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace Dal.Registration
{
    public static class RepositoryRegistration
    {
        public static void RegisterRepository(IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IRepository, Repository.Repository>();
        }
    }
}
