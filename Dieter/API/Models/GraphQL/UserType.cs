using GraphQL.Types;

namespace Dieter.API.Models.GraphQL
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType()
        {
            Name = "User";

            Field(x => x.UserId, type: typeof(IdGraphType));
            Field(x => x.Email, type: typeof(StringGraphType));
            Field(x => x.Recipes, type: typeof(ListGraphType<RecipeType>));
            Field(x => x.Sex, type: typeof(SexEnum));
            Field(x => x.FirstName, type: typeof(StringGraphType));
            Field(x => x.LastActive, type: typeof(DateGraphType));
            Field(x => x.LastName, type: typeof(StringGraphType));
            Field(x => x.RegistrationDate, type: typeof(DateGraphType));
            Field(x => x.UserName, type: typeof(StringGraphType));

        }
    }
}