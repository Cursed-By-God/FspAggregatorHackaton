using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FspAggregatorHackaton.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Candidates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    AvaaterURL = table.Column<string>(type: "text", nullable: false),
                    Handle = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Grade = table.Column<string>(type: "text", nullable: false),
                    CategorySpecialization = table.Column<string[]>(type: "text[]", nullable: false),
                    SalaryMax = table.Column<int>(type: "integer", nullable: false),
                    SalaryMin = table.Column<int>(type: "integer", nullable: false),
                    PrimaryStack = table.Column<string[]>(type: "text[]", nullable: false),
                    Bio = table.Column<string>(type: "text", nullable: false),
                    IsOpenToOffers = table.Column<bool>(type: "boolean", nullable: false),
                    TestIsPassed = table.Column<bool>(type: "boolean", nullable: false),
                    TestedGrade = table.Column<string>(type: "text", nullable: false),
                    TestPassedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TestCoolDownUntil = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Telegram = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    FspId = table.Column<string>(type: "text", nullable: false),
                    FspSportRang = table.Column<string>(type: "text", nullable: false),
                    FspRatingScore = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LogoUrl = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Industry = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    WebSite = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Street = table.Column<string>(type: "text", nullable: false),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FspAchivements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CandidateId = table.Column<int>(type: "integer", nullable: false),
                    TournamentName = table.Column<string>(type: "text", nullable: false),
                    Stage = table.Column<string>(type: "text", nullable: false),
                    Discipline = table.Column<string>(type: "text", nullable: false),
                    TeamName = table.Column<string>(type: "text", nullable: false),
                    RoleInTeam = table.Column<string>(type: "text", nullable: false),
                    VerificationHash = table.Column<string>(type: "text", nullable: false),
                    VerifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FspAchivements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FspAchivements_Candidates_CandidateId",
                        column: x => x.CandidateId,
                        principalTable: "Candidates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RadarSkills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CandidateId = table.Column<int>(type: "integer", nullable: false),
                    Subject = table.Column<string>(type: "text", nullable: false),
                    Score = table.Column<int>(type: "integer", nullable: false),
                    FullMark = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RadarSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RadarSkills_Candidates_CandidateId",
                        column: x => x.CandidateId,
                        principalTable: "Candidates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobOffers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CandidateId = table.Column<int>(type: "integer", nullable: false),
                    CompanyId = table.Column<int>(type: "integer", nullable: false),
                    PositionTitle = table.Column<string>(type: "text", nullable: false),
                    SalaryMin = table.Column<int>(type: "integer", nullable: false),
                    SalaryMax = table.Column<int>(type: "integer", nullable: false),
                    EmploymentType = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Perks = table.Column<string[]>(type: "text[]", nullable: false),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobOffers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobOffers_Candidates_CandidateId",
                        column: x => x.CandidateId,
                        principalTable: "Candidates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobOffers_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FspAchivements_CandidateId",
                table: "FspAchivements",
                column: "CandidateId");

            migrationBuilder.CreateIndex(
                name: "IX_JobOffers_CandidateId",
                table: "JobOffers",
                column: "CandidateId");

            migrationBuilder.CreateIndex(
                name: "IX_JobOffers_CompanyId",
                table: "JobOffers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_RadarSkills_CandidateId",
                table: "RadarSkills",
                column: "CandidateId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FspAchivements");

            migrationBuilder.DropTable(
                name: "JobOffers");

            migrationBuilder.DropTable(
                name: "RadarSkills");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Candidates");
        }
    }
}
