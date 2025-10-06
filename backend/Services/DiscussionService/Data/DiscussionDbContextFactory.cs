using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace DiscussionService.Data
{
    public class DiscussionDbContextFactory : IDesignTimeDbContextFactory<DiscussionDbContext>
    {
        public DiscussionDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("local.settings.json", optional: false)
                .AddEnvironmentVariables()
                .Build();

            var connectionString = configuration["Values:SqlConnectionString"];

            var optionsBuilder = new DbContextOptionsBuilder<DiscussionDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new DiscussionDbContext(optionsBuilder.Options);
        }
    }
}