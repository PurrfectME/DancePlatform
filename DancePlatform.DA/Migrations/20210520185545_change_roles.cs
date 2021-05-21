using Microsoft.EntityFrameworkCore.Migrations;

namespace DancePlatform.DA.Migrations
{
    public partial class change_roles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CreatedBy",
                table: "Workshops",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "472efeb4-07c7-4d48-b7c2-9bb828ad72f8", "Moderator", "MODERATOR" });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Workshops",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "518acb68-f05f-4036-8cc5-c538626c1621", "Admin", "ADMIN" });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "5c895b57-7615-45fd-b498-8386a4bde349");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "4d0e2b80-2b53-4df0-b699-f19ca889a085");
        }
    }
}
