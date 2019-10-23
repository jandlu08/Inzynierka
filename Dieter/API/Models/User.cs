using System;
using System.Collections.Generic;
using Dieter.API.Models.Enums;

namespace Dieter.API.Models
{
    public class User
    {
      
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Sex Sex { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public DateTime? LastActive { get; set; }

        public ICollection<Recipe> Recipes { get; set; }
    }
}