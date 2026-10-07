public class Repository {

    private DbContextFsp _db;

    public Repository(DbContextFsp db){
        _db = db;
    }

    public async Task<ResponseSearchParamsDTO> GetCandidateForParamsAsync(RequestSearchParamsDTO searchParams){
        IQueryable<CandidatesEntity> query = _db.Candidates;
    
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

            //делаем выборку ИЛИ
            query = query.Where(c => c.CategorySpecialization.Any(сat => categories.Contains(сat.ToLower())));
        }
        
        if(!string.IsNullOrEmpty(searchParams.Stack)){
            var Stack = searchParams.Stack
            .Split(",")
            .Select(s => s.Trim().ToLower())
            .Where(s => !string.IsNullOrEmpty(s))
            .ToList();

            //делаем выборку И
            foreach(var stackItem in Stack){
                query = query.Where(c => c.PrimaryStack.Any(s => s.ToLower().Contains(stackItem)));
            }
        }

        if(!string.IsNullOrEmpty(searchParams.Discipline)){
            
        }

        return new ResponseSearchParamsDTO { Candidates = query.ToList() };
    }

}