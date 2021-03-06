﻿using System;
using System.Collections.Generic;
using System.Linq;
using Dieter.API.Models.Enums;
using Dieter.API.Models.GraphQL.InputTypes;
using Dieter.Identity;
using GraphQL.Types;
using Microsoft.AspNetCore.Identity;


namespace Dieter.API.Models.GraphQL.DieterMutation
{
    public class DieterMutation : ObjectGraphType
    {
        public DieterMutation(ResourcesDbContext db,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager)
        {
            Field<UserType>(
                "registerUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<RegisterUserInputType>> {Name = "user"},
                    new QueryArgument<NonNullGraphType<StringGraphType>> {Name = "password"}),
                resolve: context =>
                {
                    var user = context.GetArgument<User>("user");
                    var password = context.GetArgument<string>("password");

                    var result = userManager.CreateAsync(
                        new AppUser()
                        {
                            UserName = user.UserName,
                            Email = user.Email
                        }, password).Result;

                    if (!result.Succeeded) return null;
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
                        {Name = "ingredientIds"},
                    new QueryArgument<NonNullGraphType<IdGraphType>>
                        {Name = "authorUserId"}),
                resolve: context =>
                {
                    var recipe = context.GetArgument<Recipe>("recipe");
                    var ingredients = context.GetArgument<List<int>>("ingredientIds");
                    var authorUserId = context.GetArgument<int>("authorUserId");

                    //add rating record
                    var rating = new Rating();
                    db.Ratings.Add(rating);
                    db.SaveChanges();
                    recipe.Rating = rating;

                    //add user
                    var user = db.Users.FirstOrDefault(x => x.UserId == authorUserId);
                    recipe.Author = user;

                    //add recipe
                    db.Recipes.Add(recipe);
                    db.SaveChanges();

                    //add ingredients
                    foreach (var ingredientId in ingredients)
                    {
                        var ingredientRecipe = new IngredientRecipe();
                        ingredientRecipe.RecipeId = recipe.RecipeId;
                        ingredientRecipe.IngredientId = ingredientId;
                        db.IngredientRecipes.Add(ingredientRecipe);
                    }

                    db.SaveChanges();


                    return recipe;
                });

            Field<IngredientType>(
                "addIngredient",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<AddIngredientInputType>>
                        {Name = "ingredient"}),
                resolve: context =>
                {
                    var ingredient = context.GetArgument<Ingredient>("ingredient");

                    db.Ingredients.Add(ingredient);
                    db.SaveChanges();

                    return ingredient;
                });

            Field<CommentType>(
                "addComment",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<AddCommentInputType>> {Name = "comment"},
                    new QueryArgument<NonNullGraphType<IdGraphType>> {Name = "authorUserId"},
                    new QueryArgument<NonNullGraphType<IdGraphType>> {Name = "recipeId"}),
                resolve: context =>
                {
                    var comment = context.GetArgument<Comment>("comment");
                    var authorUserId = context.GetArgument<int>("authorUserId");
                    var recipeId = context.GetArgument<int>("recipeId");

                    //add rating record
                    var rating = new Rating();
                    db.Ratings.Add(rating);
                    db.SaveChanges();
                    comment.Rating = rating;

                    //add author
                    comment.Author = db.Users.FirstOrDefault(x => x.UserId == authorUserId);
                    //add recipe
                    comment.Recipe = db.Recipes.FirstOrDefault(x => x.RecipeId == recipeId);

                    //add comment
                    comment.PublicationDate = DateTime.Now;
                    db.Comments.Add(comment);
                    db.SaveChanges();

                    return comment;
                });
            Field<UserType>(
                "loginUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> {Name = "userName"},
                    new QueryArgument<NonNullGraphType<StringGraphType>> {Name = "password"}),
                resolve: context =>
                {
                    var userName = context.GetArgument<string>("userName");
                    var password = context.GetArgument<string>("password");

                    var identityUser = userManager.FindByNameAsync(userName).Result;
                    if (identityUser == null) return null;

                    var result = signInManager
                        .CheckPasswordSignInAsync(identityUser, password, false).Result;

                    if (!result.Succeeded) return null;
                    var user = db.Users.FirstOrDefault(x => x.UserName == userName);
                    if (user == null) return null;
                    user.LastActive = DateTime.Now;
                    db.SaveChanges();
                    return user;
                });
            /*Field<PhotoType>(
                "addPhoto",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<AddPhotoInputType>> {Name = "photo"},
                    new QueryArgument<IdGraphType> {Name = "recipeId"},
                    new QueryArgument<IdGraphType> {Name = "ingredientId"}),
                resolve: context =>
                {
                    var photo = context.GetArgument<Photo>("photo");
                    var recipeId = context.GetArgument<int?>("recipeId");
                    var ingredientId = context.GetArgument<int?>("ingredientId");
                    if ((ingredientId == null && recipeId == null) || (ingredientId != null && recipeId != null))
                    {
                        return null;
                    }
                    else
                    {
                        db.Photos.Add(photo);
                        db.SaveChanges();
                        if (recipeId != null)
                        {
                            var recipe = db.Recipes.FirstOrDefault(x => x.RecipeId == recipeId);
                            if (recipe != null) recipe.Photo = photo;
                        }
                        else
                        {
                            var ingredient = db.Ingredients.FirstOrDefault(x => x.IngredientId == ingredientId);
                            if (ingredient != null) ingredient.Photo = photo;
                        }

                        db.SaveChanges();

                        return photo;
                    }
                });*/
            Field<IngredientRecipeType>(
                "assignIngredient",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> {Name = "ingredientId"},
                    new QueryArgument<NonNullGraphType<IdGraphType>> {Name = "recipeId"}),
                resolve: context =>
                {
                    var recipeId = context.GetArgument<int>("recipeId");
                    var ingredientId = context.GetArgument<int>("ingredientId");

                    var ingredientRecipe = new IngredientRecipe();
                    ingredientRecipe.RecipeId = recipeId;
                    ingredientRecipe.IngredientId = ingredientId;
                    db.IngredientRecipes.Add(ingredientRecipe);
                    db.SaveChanges();

                    return ingredientRecipe;
                }
            );
            Field<UserType>(
                name: "vote",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> {Name = "userId"},
                    new QueryArgument<IdGraphType> {Name = "recipeId"},
                    new QueryArgument<IdGraphType> {Name = "commentId"},
                    new QueryArgument<NonNullGraphType<VoteTypeEnum>> {Name = "voteType"}),
                resolve: context =>
                {
                    var userId = context.GetArgument<int>("userId");
                    var recipeId = context.GetArgument<int?>("recipeId");
                    var commentId = context.GetArgument<int?>("commentId");
                    var voteType = context.GetArgument<VoteType>("voteType");
                    var user = db.Users
                        .FirstOrDefault(x => x.UserId == userId);

                    if (recipeId == null && commentId == null)
                    {
                        return null;
                    }

                    Rating rating = null;
                    if (recipeId != null)
                    {
                        rating = db.Recipes
                            .Where(x=>x.RecipeId == recipeId)
                            .Select(x => x.Rating)
                            .FirstOrDefault();
                    }
                    else
                    {
                        rating = db.Comments
                            .Where(x=>x.CommentId == commentId)
                            .Select(x => x.Rating)
                            .FirstOrDefault();
                    }


                    var checkUserVoted = db.UserVotes
                        .Where(x => x.Rating == rating)
                        .FirstOrDefault(x => x.User == user);

                    if (checkUserVoted != null)
                    {
                        return null;
                    }

                    switch (voteType)
                    {
                        case VoteType.Up:
                            if (rating != null) rating.UpVotes += 1;
                            db.SaveChanges();
                            break;
                        case VoteType.Down:
                            if (rating != null) rating.DownVotes += 1;
                            db.SaveChanges();
                            break;
                        default:
                            return null;
                    }

                    var userVote = new UserVote {Rating = rating, User = user, VoteType = voteType};
                    db.UserVotes.Add(userVote);
                    db.SaveChanges();


                    return user;
                });
        }
    }
}