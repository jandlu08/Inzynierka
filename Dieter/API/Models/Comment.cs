using System;
using System.ComponentModel.DataAnnotations;

namespace Dieter.API.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string Content { get; set; }
        public Rating Rating { get; set; }
        public User Author { get; set; }
        [Required]
        public DateTime PublicationDate { get; set; }
    }
}
