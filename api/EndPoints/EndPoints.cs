using Microsoft.AspNetCore.Mvc;

public static class EndPoints{
    public static void AddEndPoints(this WebApplication app){

        app.MapGet("/api/candidates", (
            [FromQuery] int? page,
            [FromQuery] int? pageSize,
            [FromQuery] string? searchQuery,
            [FromQuery] string? category,
            [FromQuery] string? stack,
            [FromQuery] string? discipline,
            [FromQuery] string? sportRank,
            [FromQuery] string? grade,
            [FromQuery] int? maxSalary,
            [FromQuery] bool? hasFsp,
            [FromQuery] string? sortBy
        ) => {
            RequestSearchParamsDTO searchParams = new RequestSearchParamsDTO{
                Page = page,
                PageSize = pageSize,
                SearchQuery = searchQuery,
                Category = category,
                Stack = stack,
                Discipline = discipline,
                SportRank = sportRank,
                Grade = grade,
                MaxSalary = maxSalary,
                HasFsp = hasFsp,
                SortBy = sortBy
            };

            
            
        });

    }
}