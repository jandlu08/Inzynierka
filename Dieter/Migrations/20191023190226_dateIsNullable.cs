using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dieter.Migrations
{
    public partial class dateIsNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_AuthorUserId",
                table: "Comments");

            migrationBuilder.AlterColumn<DateTime>(
                name: "PublicationDate",
                table: "Comments",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<int>(
                name: "AuthorUserId",
                table: "Comments",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_AuthorUserId",
                table: "Comments",
                column: "AuthorUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_AuthorUserId",
                table: "Comments");

            migrationBuilder.AlterColumn<DateTime>(
                name: "PublicationDate",
                table: "Comments",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AuthorUserId",
                table: "Comments",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_AuthorUserId",
                table: "Comments",
                column: "AuthorUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
