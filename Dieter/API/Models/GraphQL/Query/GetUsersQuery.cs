using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace Dieter.API.Models.GraphQL.Query
{
    public class GetUsersQuery : ObjectGraphType
    {
        public GetUsersQuery(ResourcesDbContext db)
        {
            Field<ListGraphType<UserType>>(
                "getUsers",
                resolve: context =>
                {
                    var users = db.Users.Include(x => x.Recipes);
                    return users;
                }
            );
        }        
    }
}