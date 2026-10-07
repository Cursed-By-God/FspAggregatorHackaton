public class CandidateService{
    private readonly Repository _rep;

    public CandidateService(Repository rep) {
        _rep = rep;
    }

    public async Task<ResponseSearchParamsDTO> GetCandidateForParamsAsync(SearchParamsDTO params)
    {
        try{
        ResponseSearchParamsDTO response = await _rep.GetCandidateForParamsAsync(params);
        }catch{
            
        }
    }
}