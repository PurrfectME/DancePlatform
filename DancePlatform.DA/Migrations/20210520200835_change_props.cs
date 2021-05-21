using Microsoft.EntityFrameworkCore.Migrations;

namespace DancePlatform.DA.Migrations
{
    public partial class change_props : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "85618bd9-d37e-44a6-9b61-dfaa0e83e7b0");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "66ba18b8-f067-4ac7-b170-1e480035911d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "0ce91cc6-982c-4fb4-adad-59c71085f871");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "472efeb4-07c7-4d48-b7c2-9bb828ad72f8");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "578a99cd-4fe5-41d9-a792-5bcd4a2a421b");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "ddafaa1b-019a-4986-ab48-7e30368f6515");
        }
    }
}
