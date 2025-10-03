using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using CourseService.Data;

namespace CourseService.Functions
{
    public class GetCourses
    {
        private readonly CourseDbContext _context;

        public GetCourses(CourseDbContext context)
        {
            _context = context;
        }

        [Function("GetCourses")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "courses")] HttpRequestData req)
        {
            var courses = _context.Courses.ToList();

            var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
            await response.WriteAsJsonAsync(courses);
            return response;
        }
    }
}
