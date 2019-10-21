using GraphQL.Types;

namespace Dieter.API.Models.GraphQL
{
    public class RecipeType : ObjectGraphType<Recipe>
    {
        public RecipeType()
        {
            Name = "Recipe";

            Field(x => x.RecipeId, type: typeof(IdGraphType));
            Field(x => x.Calories, type: typeof(IntGraphType));
            Field(x => x.Comments, type: typeof(ListGraphType<CommentType>));
            Field(x => x.Description, type: typeof(StringGraphType));
            Field(x => x.Difficulty, type: typeof(DifficultyEnum));
            Field(x => x.Name, type: typeof(StringGraphType));
            Field(x => x.Photos, type: typeof(ListGraphType<PhotoType>));
            Field(x => x.Rating, type: typeof(RatingType));
            Field(x => x.Thumb, type: typeof(PhotoType));
            Field(x => x.Weight, type: typeof(IntGraphType));
            Field(x => x.EstTime, type: typeof(IntGraphType));
            Field<ListGraphType<IngredientType>>("Ingredients");
        }
    }
}