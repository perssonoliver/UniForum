using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReviewService.Migrations
{
    /// <inheritdoc />
    public partial class updateReviewModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentName",
                table: "Reviews");

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Reviews");

            migrationBuilder.AddColumn<string>(
                name: "StudentName",
                table: "Reviews",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }
    }
}
