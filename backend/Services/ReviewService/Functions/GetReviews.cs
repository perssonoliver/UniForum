using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using ReviewService.Data;

namespace ReviewService.Functions
{
    public class GetReviews
    {
        private readonly ReviewDbContext _context;

        public GetReviews(ReviewDbContext context)
        {
            _context = context;
        }

        [Function("GetReviews")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "reviews")] HttpRequestData req)
        {
            var reviews = await _context.Reviews.ToListAsync();

            var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
            await response.WriteAsJsonAsync(reviews);
            return response;
        }

        [Function("GetCourseReviews")]
        public async Task<HttpResponseData> GetByCourseId([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "courses/{courseId}/reviews")] HttpRequestData req)
        {
            var routeData = req.FunctionContext.BindingContext.BindingData;
            if (!routeData.TryGetValue("courseId", out var courseIdValue) || !int.TryParse(courseIdValue.ToString(), out var courseId))
            {
                var badRequestResponse = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                await badRequestResponse.WriteStringAsync("Invalid or missing course ID parameter");
                return badRequestResponse;
            }

            var reviews = await _context.Reviews
                .Where(r => r.CourseId == courseId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
            await response.WriteAsJsonAsync(reviews);
            return response;
        }
    }
}