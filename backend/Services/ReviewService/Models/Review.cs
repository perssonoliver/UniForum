#nullable enable
using System;

namespace ReviewService.Models
{
    public class Review
    {
        public int Id { get; set; }
        public required int CourseId { get; set; }
        public required int UserId { get; set; }
        public bool IsAnonymous { get; set; } = false;
        public double Rating { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public int LikesCount { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
