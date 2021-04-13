using Microsoft.EntityFrameworkCore.Migrations;

namespace DancePlatform.DA.Migrations
{
    public partial class change_place_entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Place",
                table: "Workshops");

            migrationBuilder.AddColumn<int>(
                name: "PlaceId",
                table: "Workshops",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "2211cf58-7a10-4176-939c-4066eb867285");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "a48df740-5b9d-4694-89a8-92094655150e");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "d6f25ab0-fb5f-4a0c-879d-fcfc713ed848");

            migrationBuilder.CreateIndex(
                name: "IX_Workshops_PlaceId",
                table: "Workshops",
                column: "PlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workshops_Places_PlaceId",
                table: "Workshops",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workshops_Places_PlaceId",
                table: "Workshops");

            migrationBuilder.DropIndex(
                name: "IX_Workshops_PlaceId",
                table: "Workshops");

            migrationBuilder.DropColumn(
                name: "PlaceId",
                table: "Workshops");

            migrationBuilder.AddColumn<string>(
                name: "Place",
                table: "Workshops",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "dd420ad3-3017-45fa-a46e-fdb017d3ec89");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "03d72442-0585-4ed1-acac-3a102b996b54");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "f309da0a-568d-4115-a977-c4d42d9c13b4");
        }
    }
}
