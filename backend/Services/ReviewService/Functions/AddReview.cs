using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using ReviewService.Data;
using ReviewService.Models;

namespace ReviewService.Functions;

public class AddReview
{
    private readonly ReviewDbContext _context;

    public AddReview(ReviewDbContext context)
    {
        _context = context;
    }

    [Function("AddReview")]
    public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "reviews")] HttpRequestData req)
    {
        var review = await req.ReadFromJsonAsync<Review>();
        if (review == null)
        {
            return req.CreateResponse(HttpStatusCode.BadRequest);
        }

        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();

        return req.CreateResponse(HttpStatusCode.Created);
    }
}
