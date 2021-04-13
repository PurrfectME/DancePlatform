using Microsoft.EntityFrameworkCore.Migrations;

namespace DancePlatform.DA.Migrations
{
    public partial class update_db_model_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workshops_Choreographer_ChoreographerId",
                table: "Workshops");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Choreographer",
                table: "Choreographer");

            migrationBuilder.RenameTable(
                name: "Choreographer",
                newName: "Choreographers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Choreographers",
                table: "Choreographers",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Places",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudioName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Places", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "a25b485c-c0b0-472a-a5c2-e0eebd8b5196");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "d184b3f3-709a-494e-a5c6-aed634d845d7");

            migrationBuilder.AddForeignKey(
                name: "FK_Workshops_Choreographers_ChoreographerId",
                table: "Workshops",
                column: "ChoreographerId",
                principalTable: "Choreographers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workshops_Choreographers_ChoreographerId",
                table: "Workshops");

            migrationBuilder.DropTable(
                name: "Places");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Choreographers",
                table: "Choreographers");

            migrationBuilder.RenameTable(
                name: "Choreographers",
                newName: "Choreographer");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Choreographer",
                table: "Choreographer",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "c65253aa-3da6-4490-bc94-4c02622b2114");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "a5712ac2-a6b4-4c9d-87ae-659899c55efa");

            migrationBuilder.AddForeignKey(
                name: "FK_Workshops_Choreographer_ChoreographerId",
                table: "Workshops",
                column: "ChoreographerId",
                principalTable: "Choreographer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
