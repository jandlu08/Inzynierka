using Dieter.API.Models.Enums;

namespace Dieter.API.Models
{
    public class UserVote
    {
        public int UserVoteId { get; set; }
        public VoteType VoteType { get; set; }
        public virtual User User { get; set; }
        public virtual Rating Rating { get; set; }
    }
}