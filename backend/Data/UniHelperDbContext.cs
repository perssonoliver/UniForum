using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class UniHelperDbContext : DbContext
    {
        public UniHelperDbContext(DbContextOptions<UniHelperDbContext> options) : base(options) { }

        public DbSet<Course> Courses { get; set; }
    }
}
