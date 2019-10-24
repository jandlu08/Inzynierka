using Microsoft.EntityFrameworkCore.Migrations;

namespace Dieter.Migrations
{
    public partial class deleteThumb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Recipes_RecipeId",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Photos_ThumbPhotoId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_ThumbPhotoId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Photos_RecipeId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "ThumbPhotoId",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "RecipeId",
                table: "Photos");

            migrationBuilder.AddColumn<int>(
                name: "PhotoId",
                table: "Recipes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_PhotoId",
                table: "Recipes",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Photos_PhotoId",
                table: "Recipes",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "PhotoId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Photos_PhotoId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_PhotoId",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Recipes");

            migrationBuilder.AddColumn<int>(
                name: "ThumbPhotoId",
                table: "Recipes",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RecipeId",
                table: "Photos",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_ThumbPhotoId",
                table: "Recipes",
                column: "ThumbPhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_RecipeId",
                table: "Photos",
                column: "RecipeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Recipes_RecipeId",
                table: "Photos",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "RecipeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Photos_ThumbPhotoId",
                table: "Recipes",
                column: "ThumbPhotoId",
                principalTable: "Photos",
                principalColumn: "PhotoId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
