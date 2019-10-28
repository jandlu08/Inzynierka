using System;
using System.ComponentModel.DataAnnotations;

namespace Dieter.API.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string Content { get; set; }
        public virtual Rating Rating { get; set; }
        [Required]
        public virtual User Author { get; set; }
        [Required]
        public virtual Recipe Recipe { get; set; }
        public DateTime? PublicationDate { get; set; }
    }
}
