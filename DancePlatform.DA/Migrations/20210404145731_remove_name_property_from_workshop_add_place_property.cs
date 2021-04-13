using Microsoft.EntityFrameworkCore.Migrations;

namespace DancePlatform.DA.Migrations
{
    public partial class remove_name_property_from_workshop_add_place_property : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Workshops",
                newName: "Place");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "004c65cc-355f-4ba8-ad8e-27b9bc70b32d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "09110829-506c-41d0-bf47-5bb2b708f03b");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Place",
                table: "Workshops",
                newName: "Name");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "f63f2a07-8de3-466e-a8b8-09f8e914db9c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "5ca13576-64c3-4966-83f4-a2fc70e567bc");
        }
    }
}
