using System.Collections.Generic;
using Dieter.API.Models.Enums;

namespace Dieter.API.Models
{
    public class Recipe
    {
        
        public int RecipeId { get; set; }
        public User AuthorUser { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? Calories { get; set; }
        public int? Weight { get; set; }
        public int? EstTime { get; set; }
        public Difficulty? Difficulty { get; set; }
        public Rating Rating { get; set; }
        public Photo Photo { get; set; }
        public ICollection<IngredientRecipe> IngredientRecipes { get; set; }
    }


}