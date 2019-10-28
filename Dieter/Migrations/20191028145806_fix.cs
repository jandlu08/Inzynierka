using Microsoft.EntityFrameworkCore.Migrations;

namespace Dieter.Migrations
{
    public partial class fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Users_AuthorUserUserId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_AuthorUserUserId",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AuthorUserUserId",
                table: "Recipes");

            migrationBuilder.AddColumn<int>(
                name: "AuthorUserId",
                table: "Recipes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_AuthorUserId",
                table: "Recipes",
                column: "AuthorUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Users_AuthorUserId",
                table: "Recipes",
                column: "AuthorUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Users_AuthorUserId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_AuthorUserId",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AuthorUserId",
                table: "Recipes");

            migrationBuilder.AddColumn<int>(
                name: "AuthorUserUserId",
                table: "Recipes",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_AuthorUserUserId",
                table: "Recipes",
                column: "AuthorUserUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Users_AuthorUserUserId",
                table: "Recipes",
                column: "AuthorUserUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
