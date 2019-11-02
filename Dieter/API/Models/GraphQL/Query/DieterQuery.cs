using System;
using System.Collections.Generic;
using System.Linq;
using GraphQL.Types;
using GraphQLParser.AST;
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
                        .FirstOrDefault(i => i.UserId == id);
                }
            );
            Field<ListGraphType<UserType>>(
                "getUsers",
                resolve: context => db.Users);


            Field<RecipeType>(
                "getRecipe",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> {Name = "recipeId",}),
                resolve: context =>
                {
                    var id = context.GetArgument<int?>("recipeId");
                    return db
                        .Recipes
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
                            .Recipes;
                    }

                    if (calories == null)
                    {
                        return db
                            .Recipes
                            .Take((int) amount);
                    }

                    if (amount == null)
                    {
                        return db
                            .Recipes
                            .Where(x => x.Calories <= calories);
                    }

                    var allRecipes = db.Recipes
                        .Where(x => x.Calories <= calories/amount).ToList();

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
                            calories -= recipe.Calories;
                            allRecipes.RemoveAt(index);
                        }
                        else
                        {
                            allRecipes.RemoveAt(index);
                        }
                    }

                    return returnRecipes;
                }
            );

            Field<CommentType>(
                "getComment",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> {Name = "commentId"}),
                resolve: context =>
                {
                    var commentId = context.GetArgument<int?>("commentId");
                    return db.Comments
                        .FirstOrDefault(x => x.CommentId == commentId);
                });
            Field<ListGraphType<CommentType>>(
                "getComments",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> {Name = "recipeId"}),
                resolve: context =>
                {
                    var recipeId = context.GetArgument<int?>("recipeId");
                    return db.Comments
                        .Where(x => x.Recipe.RecipeId == recipeId);
                });

            Field<IngredientType>(
                "getIngredient",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> {Name = "ingredientId"}),
                resolve: context =>
                {
                    var ingredientId = context.GetArgument<int?>("ingredientId");
                    return db.Ingredients
                        .FirstOrDefault(x => x.IngredientId == ingredientId);
                });
            Field<ListGraphType<IngredientType>>(
                "getIngredients",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> {Name = "recipeId"},
                    new QueryArgument<IngredientTypeEnum> {Name = "ingredientType"}),
                resolve: context =>
                {
                    var recipeId = context.GetArgument<int?>("recipeId");
                    var ingredientType = context.GetArgument<Enums.IngredientType?>("ingredientType");

                    if (recipeId == null && ingredientType == null)
                    {
                        return db.Ingredients;
                    }
                    else if (recipeId == null)
                    {
                        return db.Ingredients
                            .Where(x => x.IngredientType.Value == ingredientType);
                    }

                    return db.Recipes
                        .Where(x => x.RecipeId == recipeId)
                        .Select(x => x.IngredientRecipes.Select(y => y.Ingredient))
                        .SingleOrDefault();
                });
            Field<ListGraphType<RecipeType>>(
                "getUserRecipes",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> {Name = "userId"}),
                resolve: context =>
                {
                    var userId = context.GetArgument<int>("userId");
                    return db.Recipes.Where(x => x.Author.UserId == userId);
                });
        }
    }
}