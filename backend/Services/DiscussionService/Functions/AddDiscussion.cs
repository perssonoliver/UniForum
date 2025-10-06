using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using DiscussionService.Data;
using DiscussionService.Models;

namespace DiscussionService.Functions;

public class AddDiscussion
{
    private readonly DiscussionDbContext _context;

    public AddDiscussion(DiscussionDbContext context)
    {
        _context = context;
    }

    [Function("AddDiscussion")]
    public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "discussions")] HttpRequestData req)
    {
        var discussion = await req.ReadFromJsonAsync<Discussion>();
        if (discussion == null)
        {
            return req.CreateResponse(HttpStatusCode.BadRequest);
        }

        _context.Discussions.Add(discussion);
        await _context.SaveChangesAsync();

        return req.CreateResponse(HttpStatusCode.Created);
    }
}
