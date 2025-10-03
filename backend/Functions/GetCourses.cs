using System;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using backend.Data;

namespace backend.Functions
{
    public class GetCourses
    {
        private readonly UniHelperDbContext _context;

        public GetCourses(UniHelperDbContext context)
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
