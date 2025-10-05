using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using ReviewService.Data;
using System;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices((context, services) =>
    {
        var connectionString = Environment.GetEnvironmentVariable("SqlConnectionString");
        services.AddDbContext<ReviewDbContext>(options =>
            options.UseSqlServer(connectionString));
    })
    .Build();

host.Run();
