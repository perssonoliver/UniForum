using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using UserService.Data;
using UserService.Models;

namespace UserService.Functions;

public class AddUser
{
    private readonly UserDbContext _context;

    public AddUser(UserDbContext context)
    {
        _context = context;
    }

    [Function("AddUser")]
    public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "users")] HttpRequestData req)
    {
        var user = await req.ReadFromJsonAsync<User>();
        if (user == null)
        {
            return req.CreateResponse(HttpStatusCode.BadRequest);
        }

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return req.CreateResponse(HttpStatusCode.Created);
    }
}
