using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using UserService.Data;

namespace UserService;

public class KeepAlive
{
    private readonly UserDbContext _context;

    public KeepAlive(UserDbContext context)
    {
        _context = context;
    }

    [Function("KeepAlive")]
    public async Task Run([TimerTrigger("0 0 * * * *")] TimerInfo myTimer)
    {
        await _context.Database.ExecuteSqlRawAsync("SELECT 1");
    }
}
