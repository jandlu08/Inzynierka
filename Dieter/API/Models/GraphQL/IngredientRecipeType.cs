﻿using GraphQL.Types;

namespace Dieter.API.Models.GraphQL
{
    public class IngredientRecipeType : ObjectGraphType<IngredientRecipe>
    {
        public IngredientRecipeType()
        {
            Name = "IngredientRecipeType";
            Field(x => x.Ingredient, type: typeof(IngredientType));
            Field(x => x.Recipe, type: typeof(RecipeType));
            Field(x => x.IngredientId, type: typeof(IdGraphType));
            Field(x => x.RecipeId, type: typeof(IdGraphType));
        }
    }
}