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
            SearchParamsDTO searchParams = new SearchParamsDTO{
                Page = page,
                PageSize = pageSize,
                SearchQuery = searchQuery,
                Category = category,
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