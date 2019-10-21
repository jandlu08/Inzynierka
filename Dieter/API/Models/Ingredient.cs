﻿using System.Collections.Generic;
using Dieter.API.Models.Enums;

namespace Dieter.API.Models
{
    public class Ingredient
    {
        public int IngredientId { get; set; }
        public string Name { get; set; }
        public IngredientType IngredientType { get; set; }
        public int Calories { get; set; }
        public Photo Photo { get; set; }
        public string Description { get; set; }

        public ICollection<IngredientRecipe> IngredientRecipes { get; set; }
    }
}