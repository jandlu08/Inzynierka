using System;
using System.Collections.Generic;
using System.Linq;
using Dieter.API.Models.GraphQL.InputTypes;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Dieter.API.Models.GraphQL.DieterMutation
{
    public class DieterMutation : ObjectGraphType
    {
        public DieterMutation(ResourcesDbContext db)
        {
            Field<UserType>(
                "registerUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<RegisterUserInputType>>
                        {Name = "user"}),
                resolve: context =>
                {
                    var user = context.GetArgument<User>("user");
                    user.RegistrationDate = DateTime.Now;
                    user.LastActive = DateTime.Now;
                    db.Users.Add(user);
                    db.SaveChanges();

                    return user;
                });

            Field<RecipeType>(
                "addRecipe",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<AddRecipeInputType>>
                        {Name = "recipe"},
                    new QueryArgument<NonNullGraphType<ListGraphType<IdGraphType>>>
                        {Name = "ingredientIds"}),
                resolve: context =>
                {
                    var recipe = context.GetArgument<Recipe>("recipe");
                    var userId = context.GetArgument<int>("userId");
                    var ingredients = context.GetArgument<List<int>>("ingredientIds");
                    
                    

                    //add rating record
                    var rating = new Rating();
                    db.Ratings.Add(rating);
                    db.SaveChanges();

                    //add recipe
                    recipe.Rating = rating;
                    db.Recipes.Add(recipe);
                    db.SaveChanges();
                    
                    //add ingredients
                    foreach (var ingredientIds in ingredients)
                    {
                        var ingredientRecipe = new IngredientRecipe();
                        ingredientRecipe.RecipeId = recipe.RecipeId;
                        ingredientRecipe.IngredientId = ingredientIds;
                        db.IngredientRecipes.Add(ingredientRecipe);
                    }

                    db.SaveChanges();

                    

                    return recipe;
                });
        }
    }
}