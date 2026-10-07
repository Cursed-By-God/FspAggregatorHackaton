public class DbContextFsp: DbContext {
    DbSet<CandidatesEntity> Candidates {get; set;}
    DbSet<FspAchivementsEntity> FspAchivements {get; set;}
    DbSet<RadarSkillsEntity> RadarSkills {get; set;}
    DbSet<JobOffersEntity> JobOffers {get; set;}
    DbSet<CompanyEntity> Company {get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.Entity<CompanyEntity>().HasKey(x=>x.Id);
        modelBuilder.Entity<CandidatesEntity>().HasKey(x=>x.Id);
        modelBuilder.Entity<RadarSkillsEntity>().HasKey(x=>x.Id);
        modelBuilder.Entity<FspAchivementsEntity>().HasKey(x=>x.Id);
        modelBuilder.Entity<JobOffersEntity>().HasKey(x=>x.Id);

        modelBuilder.Entity<RadarSkillsEntity>().ToTable("RadarSkills");
        modelBuilder.Entity<JobOffersEntity>().ToTable("JobOffers");
        modelBuilder.Entity<FspAchivementsEntity>().ToTable("FspAchivements");
        modelBuilder.Entity<CandidatesEntity>().ToTable("Candidates");
        modelBuilder.Entity<CompanyEntity>().ToTable("Companies");


        modelBuilder.Entity<CandidatesEntity>()
            .HasMany(c => c.FspAchivements)           
            .WithOne(a => a.Candidate)                
            .HasForeignKey(a => a.CandidateId)        
            .OnDelete(DeleteBehavior.Cascade);        

        modelBuilder.Entity<CandidatesEntity>()
            .HasMany(c => c.RadarSkills)
            .WithOne(r => r.Candidate)
            .HasForeignKey(r => r.CandidateId)
            .OnDelete(DeleteBehavior.Cascade);


        modelBuilder.Entity<CandidatesEntity>()
            .HasMany(c => c.JobOffers)
            .WithOne(j => j.Candidate)
            .HasForeignKey(j => j.CandidateId)
            .OnDelete(DeleteBehavior.Cascade);

        
        modelBuilder.Entity<CompanyEntity>()
            .HasMany(c => c.JobOffers)                
            .WithOne(j => j.Company)                  
            .HasForeignKey(j => j.CompanyId)          
            .OnDelete(DeleteBehavior.Cascade);

        
    }
} 