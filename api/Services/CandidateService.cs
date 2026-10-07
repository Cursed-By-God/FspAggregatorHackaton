public class CandidateService{
    private readonly Repository _rep;

    public CandidateService(Repository rep) {
        _rep = rep;
    }

    public async Task<ResponseSearchParamsDTO> GetCandidateForParamsAsync(RequestSearchParamsDTO searchParams)
    {
        try{
            ResponseSearchParamsDTO response = await _rep.GetCandidateForParamsAsync(searchParams);
            return response;
        }catch{
            return new ResponseSearchParamsDTO();
        }
    }
}