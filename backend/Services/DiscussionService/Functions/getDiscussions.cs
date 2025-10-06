using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using DiscussionService.Data;

namespace DiscussionService.Functions
{
    public class GetDiscussions
    {
        private readonly DiscussionDbContext _context;

        public GetDiscussions(DiscussionDbContext context)
        {
            _context = context;
        }

        [Function("GetDiscussions")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "discussions")] HttpRequestData req)
        {
            var discussions = await _context.Discussions.ToListAsync();

            var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
            await response.WriteAsJsonAsync(discussions);
            return response;
        }

        [Function("GetCourseDiscussions")]
        public async Task<HttpResponseData> GetByCourseId([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "courses/{courseId}/discussions")] HttpRequestData req)
        {
            var routeData = req.FunctionContext.BindingContext.BindingData;
            if (!routeData.TryGetValue("courseId", out var courseIdValue) || !int.TryParse(courseIdValue.ToString(), out var courseId))
            {
                var badRequestResponse = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                await badRequestResponse.WriteStringAsync("Invalid or missing course ID parameter");
                return badRequestResponse;
            }

            var discussions = await _context.Discussions
                .Where(r => r.CourseId == courseId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
            await response.WriteAsJsonAsync(discussions);
            return response;
        }
    }
}