using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using System;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices((context, services) =>
    {
        var connectionString = Environment.GetEnvironmentVariable("SqlConnectionString");
        services.AddDbContext<UniHelperDbContext>(options =>
            options.UseSqlServer(connectionString));
    })
    .Build();

host.Run();
