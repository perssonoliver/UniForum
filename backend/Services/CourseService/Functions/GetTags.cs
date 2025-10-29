using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using CourseService.Data;

namespace CourseService.Functions
{
    public class GetTags
    {
        private readonly CourseDbContext _context;

        public GetTags(CourseDbContext context)
        {
            _context = context;
        }

        [Function("GetTags")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "courses/{courseId}/tags")] HttpRequestData req)
        {
            var routeData = req.FunctionContext.BindingContext.BindingData;
            if (!routeData.TryGetValue("courseId", out var courseIdValue) || !int.TryParse(courseIdValue.ToString(), out var courseId))
            {
                var badRequestResponse = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                await badRequestResponse.WriteStringAsync("Invalid or missing course ID parameter");
                return badRequestResponse;
            }

            var tags = await _context.Tags
                .Where(t => t.CourseId == courseId)
                .ToListAsync();

            var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
            await response.WriteAsJsonAsync(tags);
            return response;
        }
    }
}