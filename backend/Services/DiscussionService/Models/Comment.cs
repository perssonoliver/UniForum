using System;

namespace DiscussionService.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public required int DiscussionId { get; set; }
        public required string Content { get; set; }
        public required string UserId { get; set; }
        public int LikesCount { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}