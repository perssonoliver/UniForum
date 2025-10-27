using System;

namespace CourseService.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required int CourseId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
