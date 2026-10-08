using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DbContextFsp>(p => p.UseNpgsql(builder.Configuration["ConnectionString"]));
builder.Services.AddScoped<Repository>();
builder.Services.AddScoped<CandidateService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy => {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAll");
app.AddEndPoints();

var distPath = Path.Combine(builder.Environment.ContentRootPath, "..", "src", "dist");

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(distPath),
    RequestPath = ""
});

app.MapFallbackToFile("index.html", new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(distPath)
});

app.Run();
