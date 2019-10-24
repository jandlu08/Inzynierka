using System;
using System.Collections.Generic;
using System.Linq;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace Dieter.API.Models.GraphQL.Query
{
    public class DieterQuery : ObjectGraphType
    {
        public DieterQuery(ResourcesDbContext db)
        {
            Field<UserType>(
                "getUser",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> {Name = "userId",}),
                resolve: context =>
                {
                    var id = context.GetArgument<int?>("userId");
                    return db
                        .Users
                        .Include(x => x.Recipes)
                        .FirstOrDefault(i => i.UserId == id);
                }
            );
            Field<ListGraphType<UserType>>(
                "getUsers",
                resolve: context => { return db.Users.Include(x => x.Recipes); }
            );


            Field<RecipeType>(
                "getRecipe",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> {Name = "recipeId",}),
                resolve: context =>
                {
                    var id = context.GetArgument<int?>("recipeId");
                    return db
                        .Recipes
                        .Include(x => x.Photo)
                        .Include(x=>x.Comments)
                        .FirstOrDefault(i => i.RecipeId == id);
                }
            );
            Field<ListGraphType<RecipeType>>(
                "getRecipes",
                arguments: new QueryArguments(
                    new QueryArgument<IntGraphType> {Name = "calories",},
                    new QueryArgument<IntGraphType> {Name = "amount"},
                    new QueryArgument<IntGraphType> {Name = "offset", DefaultValue = 0}),
                resolve: context =>
                {
                    var calories = context.GetArgument<int?>("calories");
                    var amount = context.GetArgument<int?>("amount");
                    var offset = context.GetArgument<int?>("offset");

                    if (calories == null && amount == null)
                    {
                        return db
                            .Recipes
                            .Include(x => x.Comments)
                            .Include(x => x.Photo);
                    }

                    if (calories == null)
                    {
                        return db
                            .Recipes
                            .Include(x => x.Comments)
                            .Include(x => x.Photo)
                            .Take((int) amount);
                    }

                    if (amount == null)
                    {
                        return db
                            .Recipes
                            .Include(x => x.Comments)
                            .Include(x => x.Photo)
                            .Where(x => x.Calories <= calories);
                    }

                    var allRecipes = db.Recipes
                        .Include(x => x.Comments)
                        .Include(x => x.Photo)
                        .Where(x => x.Calories <= calories).ToList();

                    var returnRecipes = new List<Recipe>();
                    var rnd = new Random();
                    while (amount > 0 && allRecipes.Count > 0 && calories > 0)
                    {
                        var index = rnd.Next(allRecipes.Count - 1);
                        var recipe = allRecipes[index];
                        if (calories - recipe.Calories - offset > 0)
                        {
                            returnRecipes.Add(recipe);
                            amount--;
                            calories = -recipe.Calories;
                            allRecipes.RemoveAt(index);
                        }
                        else
                        {
                            amount--;
                            allRecipes.RemoveAt(index);
                        }
                    }

                    return returnRecipes;
                }
            );

            Field<CommentType>(
                "getComment",
                arguments: new QueryArguments(
                    new QueryArgument<IntGraphType> {Name = "commentId"}),
                resolve: context =>
                {
                    var commentId = context.GetArgument<int?>("commentId");
                    return db.Comments
                        .Include(x => x.Author)
                        .Include(x => x.Rating)
                        .FirstOrDefault(x => x.CommentId == commentId);
                });
            Field<ListGraphType<CommentType>>(
                "getComments",
                arguments: new QueryArguments(
                    new QueryArgument<IntGraphType> {Name = "recipeId"}),
                resolve: context =>
                {
                    var recipeId = context.GetArgument<int?>("recipeId");
                    return db.Recipes
                        .Include(x => x.Comments)
                        .ThenInclude(x=> x.Author)
                        .Where(x => x.RecipeId == recipeId)
                        .Select(x => x.Comments)
                        .SingleOrDefault();;
                });
            
            Field<IngredientType>(
                "getIngredient",
                arguments: new QueryArguments(
                    new QueryArgument<IntGraphType> {Name = "ingredientId"}),
                resolve: context =>
                {
                    var ingredientId = context.GetArgument<int?>("ingredientId");
                    return db.Ingredients
                        .Include(x => x.Photo)
                        .FirstOrDefault(x => x.IngredientId == ingredientId);
                });
            Field<ListGraphType<IngredientType>>(
                "getIngredients",
                arguments: new QueryArguments(
                    new QueryArgument<IntGraphType> {Name = "recipeId"}),
                resolve: context =>
                {
                    var recipeId = context.GetArgument<int?>("recipeId");

                    if (recipeId == null)
                    {
                        return db.Ingredients
                            .Include(x => x.Photo);
                    }

                    return db.Recipes
                        .Include(x => x.IngredientRecipes)
                        .ThenInclude(x => x.Ingredient)
                        .Where(x => x.RecipeId == recipeId)
                        .Select(x => x.IngredientRecipes.Select(y => y.Ingredient))
                        .SingleOrDefault();
                });
            
        }
    }
}