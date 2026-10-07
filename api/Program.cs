var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

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
