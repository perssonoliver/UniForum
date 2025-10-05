using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using CourseService.Data;
using CourseService.Models;

namespace CourseService.Functions;

public class AddCourse
{
    private readonly CourseDbContext _context;

    public AddCourse(CourseDbContext context)
    {
        _context = context;
    }

    [Function("AddCourse")]
    public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "courses")] HttpRequestData req)
    {
        var course = await req.ReadFromJsonAsync<Course>();
        if (course == null)
        {
            return req.CreateResponse(HttpStatusCode.BadRequest);
        }

        _context.Courses.Add(course);
        await _context.SaveChangesAsync();

        return req.CreateResponse(HttpStatusCode.Created);
    }
}
