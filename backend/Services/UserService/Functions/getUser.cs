using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using UserService.Data;

namespace UserService.Functions
{
    public class GetUser
    {
        private readonly UserDbContext _context;

        public GetUser(UserDbContext context)
        {
            _context = context;
        }

        [Function("GetUser")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users/{userId}")] HttpRequestData req)
        {
            var routeData = req.FunctionContext.BindingContext.BindingData;
            if (!routeData.TryGetValue("userId", out var userIdValue) || !int.TryParse(userIdValue.ToString(), out var userId))
            {
                var badRequestResponse = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                await badRequestResponse.WriteStringAsync("Invalid or missing user ID parameter");
                return badRequestResponse;
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                var notFoundResponse = req.CreateResponse(System.Net.HttpStatusCode.NotFound);
                await notFoundResponse.WriteStringAsync("User not found");
                return notFoundResponse;
            }

            var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
            await response.WriteAsJsonAsync(user);
            return response;
        }
    }
}