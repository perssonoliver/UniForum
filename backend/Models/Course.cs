using System;

namespace backend.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public double Credits { get; set; }
        public string Level { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
