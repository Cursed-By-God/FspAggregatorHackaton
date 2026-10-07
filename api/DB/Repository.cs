public class Repository {

    private DbContextFsp _db;

    public Repository(DbContextFsp db){
        _db = db;
    }

    public async Task<ResponseSearchParamsDTO> GetCandidateForParamsAsync(SearchParamsDTO searchParams){
        IQueryable<CandidateEntity> query = _db.Candidates;
        var 


       if (!string.IsNullOrWhiteSpace(searchParams.SearchQuery))
        {
            var searchWords = searchParams.SearchQuery
                .Split(',')
                .Select(w => w.Trim().ToLower())
                .Where(w => !string.IsNullOrEmpty(w))
                .ToList();

            //выборка И
            foreach (var word in searchWords)
            {
                query = query.Where(c => 
                    c.FullName.ToLower().Contains(word) ||
                    c.Handle.ToLower().Contains(word) ||
                    c.PrimaryStack.Any(stackItem => stackItem.ToLower().Contains(word))
                );
            }
        }

        if(!string.IsNullOrEmpty(searchParams.Category)){
            var categories = searchParams.Category
            .Split(",")
            .Select(c => c.Trim().ToLower())
            .Where(c => !string.IsNullOrEmpty(c))
            .ToList();

            //делаем выборку или
            query = query.Where(c => c.CategorySpecialization.Any(сat => categories.Contains(сat.ToLower())));
        }
        
    }

}