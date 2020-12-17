using Microsoft.EntityFrameworkCore.Migrations;

namespace DancePlatform.DA.Migrations
{
    public partial class change_models : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workshops_AspNetUsers_ChoreographerId",
                table: "Workshops");

            migrationBuilder.DropIndex(
                name: "IX_Workshops_ChoreographerId",
                table: "Workshops");

            migrationBuilder.DropColumn(
                name: "ChoreographerId",
                table: "Workshops");

            migrationBuilder.DropColumn(
                name: "Number",
                table: "Workshops");

            migrationBuilder.AlterColumn<int>(
                name: "Style",
                table: "Workshops",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Category",
                table: "Workshops",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Choreographer",
                table: "Workshops",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfPeople",
                table: "Workshops",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "5db75d99-1849-4a66-a5b0-0d017a97d3fa");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "7f9b3f49-ee21-4567-bb9a-28affd1fcd16");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Choreographer",
                table: "Workshops");

            migrationBuilder.DropColumn(
                name: "NumberOfPeople",
                table: "Workshops");

            migrationBuilder.AlterColumn<string>(
                name: "Style",
                table: "Workshops",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Workshops",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "ChoreographerId",
                table: "Workshops",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Number",
                table: "Workshops",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "4b3720fa-7fe8-410b-87bc-712b08694e1b");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "7a9c3a9b-91e5-44d4-b368-5d47c1544335");

            migrationBuilder.CreateIndex(
                name: "IX_Workshops_ChoreographerId",
                table: "Workshops",
                column: "ChoreographerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workshops_AspNetUsers_ChoreographerId",
                table: "Workshops",
                column: "ChoreographerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
