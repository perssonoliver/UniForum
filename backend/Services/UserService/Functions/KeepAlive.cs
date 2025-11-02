using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using UserService.Data;

namespace UserService;

public class KeepAlive
{
    private readonly ILogger<KeepAlive> _logger;
    private readonly UserDbContext _context;

    public KeepAlive(ILogger<KeepAlive> logger, UserDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [Function("KeepAlive")]
    public async Task Run([TimerTrigger("0 0 * * * *")] TimerInfo myTimer)
    {
        _logger.LogInformation($"Database keep-alive executed at: {System.DateTime.UtcNow}");
        
        try
        {
            await _context.Database.ExecuteSqlRawAsync("SELECT 1");
            _logger.LogInformation("Database ping successful");
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "Database ping failed");
        }
    }
}
