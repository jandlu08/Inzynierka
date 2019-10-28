using GraphQL.Types;

namespace Dieter.API.Models.GraphQL
{
    public class IngredientType : ObjectGraphType<Ingredient>
    {
        public IngredientType()
        {
            Name = "Ingredient";

            Field(x => x.IngredientId, type: typeof(IdGraphType));
            Field(x => x.Calories, type: typeof(IntGraphType));
            Field(x => x.Description, type: typeof(StringGraphType));
            Field(x => x.Name, type: typeof(StringGraphType));
            Field(x => x.Photo, type: typeof(PhotoType));
            Field(x => x.IngredientType, type: typeof(IngredientTypeEnum));
            Field(x => x.IngredientRecipes, type: typeof(IngredientRecipeType));

        }
    }
}