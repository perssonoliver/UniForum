using System;
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
    public async Task Run([TimerTrigger("0 */30 * * * *")] TimerInfo myTimer)
    {
        var now = DateTime.UtcNow.AddHours(1);
        _logger.LogInformation($"KeepAlive timer triggered at: {now}");

        if (now.Hour < 7 || now.Hour >= 16)
        {
            _logger.LogInformation("Outside allowed time window (07:00–16:00). Skipping ping.");
            return;
        }

        var validTimes = new[]
        {
            new TimeSpan(7, 30, 0),
            new TimeSpan(9, 0, 0),
            new TimeSpan(10, 30, 0),
            new TimeSpan(12, 0, 0),
            new TimeSpan(13, 30, 0),
            new TimeSpan(15, 0, 0)
        };

        var currentTime = new TimeSpan(now.Hour, now.Minute, 0);

        bool shouldPing = Array.Exists(validTimes, t => Math.Abs((t - currentTime).TotalMinutes) < 1);

        if (!shouldPing)
        {
            _logger.LogInformation("Not a scheduled 90-minute slot. Skipping ping.");
            return;
        }

        try
        {
            _logger.LogInformation("Executing database keep-alive...");
            await _context.Database.ExecuteSqlRawAsync("SELECT 1");
            _logger.LogInformation("Database ping successful.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Database ping failed.");
        }
    }
}