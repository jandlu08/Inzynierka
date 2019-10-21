﻿using Dieter.Models;

namespace Dieter.API.Models
{
    public class IngredientRecipe
    {
        public int IngredientId { get; set; }
        public Ingredient Ingredient { get; set; }

        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}
