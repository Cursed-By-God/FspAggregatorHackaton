public class JobOffersEntity{
    public int id {get; set;}
    public int CandidateId {get; set;}
    public int CompanyId {get; set;}
    public string PositionTitle {get; set;} 
    public int SalaryMin {get; set;}
    public int SalaryMax {get; set;}
    public string EmploymentType {get; set;}
    public string Message {get; set;}
    public string Status {get; set;}
    public string[] Perks {get; set;}
    public DateTime SentAt {get; set;}
    

    public CandidatesEntity? Candidate {get; set;}
    public CompanyEntity? Company {get; set;}
}