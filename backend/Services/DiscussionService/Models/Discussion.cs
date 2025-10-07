using System;

namespace DiscussionService.Models
{
    public class Discussion
    {
        public int Id { get; set; }
        public required int CourseId { get; set; }
        public required int UserId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public int LikesCount { get; set; } = 0;
        public int CommentsCount { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}