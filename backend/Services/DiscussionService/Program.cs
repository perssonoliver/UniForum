using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using DiscussionService.Data;
using System;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices((context, services) =>
    {
        var connectionString = Environment.GetEnvironmentVariable("SqlConnectionString");
        services.AddDbContext<DiscussionDbContext>(options =>
            options.UseSqlServer(connectionString));
    })
    .Build();

host.Run();
