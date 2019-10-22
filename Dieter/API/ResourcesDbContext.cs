﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
 using Dieter.API.Models;
 using Microsoft.EntityFrameworkCore;

namespace Dieter
{
    public class ResourcesDbContext : DbContext
    {
        public ResourcesDbContext(DbContextOptions<ResourcesDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IngredientRecipe>().HasKey(ir => new {ir.IngredientId, ir.RecipeId});
        }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<IngredientRecipe> IngredientRecipes { get; set; }
    }
}