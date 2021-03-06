﻿using System.Collections.Generic;
using Dieter.API.Models.Enums;

namespace Dieter.API.Models
{
    public class Recipe
    {
        
        public int RecipeId { get; set; }
        public virtual User Author { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? Calories { get; set; }
        public int? Weight { get; set; }
        public int? EstTime { get; set; }
        public Difficulty? Difficulty { get; set; }
        public virtual Rating Rating { get; set; }
        public virtual Photo Photo { get; set; }
        
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<IngredientRecipe> IngredientRecipes { get; set; }
    }


}