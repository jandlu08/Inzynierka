using System.Linq;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace Dieter.API.Models.GraphQL.Query
{
    public class DieterQuery : ObjectGraphType
    {
        public DieterQuery(ResourcesDbContext db)
        {
            Field<UserType>(
                "getUser",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> {Name = "userId",}),
                resolve: context =>
                {
                    var id = context.GetArgument<int?>("userId");
                    var user = db
                        .Users
                        .Include(x => x.Recipes)
                        .FirstOrDefault(i => i.UserId == id);
                    return user;
                }
            );
            Field<ListGraphType<UserType>>(
                "getUsers",
                resolve: context =>
                {
                    var users = db.Users.Include(x => x.Recipes);
                    return users;
                }
            );
            
            
            Field<RecipeType>(
                "getRecipe",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> {Name = "recipeId",}),
                resolve: context =>
                {
                    var id = context.GetArgument<int?>("recipeId");
                    var user = db
                        .Recipes
                        .Include(x=>x.Photos)
                        .FirstOrDefault(i => i.RecipeId == id);
                    return user;
                }
            );
            
        }        
    }
}