using GraphQL.Types;

namespace Dieter.API.Models.GraphQL.InputTypes
{
    public class AddIngredientInputType : InputObjectGraphType
    {
        public AddIngredientInputType()
        {
            Name = "AddIngredientInput";
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<NonNullGraphType<IngredientTypeEnum>>("ingredientType");
            Field<NonNullGraphType<IntGraphType>>("calories");
            Field<IdGraphType>("photoId");
            Field<StringGraphType>("description");
        }
    }
}