using GraphQL.Types;

namespace Dieter.API.Models.GraphQL
{
    public class UserVoteType : ObjectGraphType<UserVote>
    {
        public UserVoteType()
        {
            Name = "UserVote";

            Field(x => x.UserVoteId, type: typeof(IdGraphType));
            Field(x => x.Rating, type: typeof(RatingType));
            Field(x => x.VoteType, type: typeof(VoteTypeEnum));
            Field(x => x.User, type: typeof(UserType));
        }
    }
}