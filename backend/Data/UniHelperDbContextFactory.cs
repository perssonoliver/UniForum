using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using backend.Data;
using System;

namespace backend
{
    public class UniHelperDbContextFactory : IDesignTimeDbContextFactory<UniHelperDbContext>
    {
        public UniHelperDbContext CreateDbContext(string[] args)
        {
            var cs = Environment.GetEnvironmentVariable("SqlConnectionString"); 
            var optionsBuilder = new DbContextOptionsBuilder<UniHelperDbContext>();
            optionsBuilder.UseSqlServer(cs);

            return new UniHelperDbContext(optionsBuilder.Options);
        }
    }
}