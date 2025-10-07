using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using DiscussionService.Data;

namespace DiscussionService.Functions
{
    public class GetComments
    {
        private readonly DiscussionDbContext _context;

        public GetComments(DiscussionDbContext context)
        {
            _context = context;
        }

        [Function("GetDiscussionComments")]
        public async Task<HttpResponseData> GetByDiscussionId([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "discussions/{discussionId}/comments")] HttpRequestData req)
        {
            var routeData = req.FunctionContext.BindingContext.BindingData;
            if (!routeData.TryGetValue("discussionId", out var discussionIdValue) || !int.TryParse(discussionIdValue.ToString(), out var discussionId))
            {
                var badRequestResponse = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                await badRequestResponse.WriteStringAsync("Invalid or missing discussion ID parameter");
                return badRequestResponse;
            }

            var comments = await _context.Comments
                .Where(r => r.DiscussionId == discussionId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
            await response.WriteAsJsonAsync(comments);
            return response;
        }
    }
}
