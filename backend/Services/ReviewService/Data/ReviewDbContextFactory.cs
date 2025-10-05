using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace ReviewService.Data
{
    public class ReviewDbContextFactory : IDesignTimeDbContextFactory<ReviewDbContext>
    {
        public ReviewDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("local.settings.json", optional: false)
                .AddEnvironmentVariables()
                .Build();

            var connectionString = configuration["Values:SqlConnectionString"];

            var optionsBuilder = new DbContextOptionsBuilder<ReviewDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new ReviewDbContext(optionsBuilder.Options);
        }
    }
}