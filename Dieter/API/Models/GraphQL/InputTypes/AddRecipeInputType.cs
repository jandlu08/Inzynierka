using GraphQL.Types;

namespace Dieter.API.Models.GraphQL.InputTypes
{
    public class AddRecipeInputType : InputObjectGraphType
    {
        public AddRecipeInputType()
        {
            Name = "RecipeInput";

            Field<NonNullGraphType<StringGraphType>>("name");
            Field<StringGraphType>("description");
            Field<NonNullGraphType<IntGraphType>>("calories");
            Field<NonNullGraphType<IntGraphType>>("weight");
            Field<IntGraphType>("estTime");
            Field<NonNullGraphType<DifficultyEnum>>("difficulty");
            Field<IdGraphType>("photoId");
            
          
        }
    }
}