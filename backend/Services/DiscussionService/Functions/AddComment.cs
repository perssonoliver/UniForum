using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using DiscussionService.Data;
using DiscussionService.Models;

namespace DiscussionService.Functions
{
    public class AddComment
    {
        private readonly DiscussionDbContext _context;

        public AddComment(DiscussionDbContext context)
        {
            _context = context;
        }

        [Function("AddComment")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "comments")] HttpRequestData req)
        {
            var comment = await req.ReadFromJsonAsync<Comment>();
            if (comment == null)
            {
                return req.CreateResponse(HttpStatusCode.BadRequest);
            }

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return req.CreateResponse(HttpStatusCode.Created);
        }
    }
}
