using GraphQL.Types;

namespace Dieter.API.Models.GraphQL
{
    public class RatingType : ObjectGraphType<Rating>
    {
        public RatingType()
        {
            Name = "Rating";

            Field(x => x.RatingId, type: typeof(IdGraphType));
            Field(x => x.DownVotes, type: typeof(IntGraphType));
            Field(x => x.UpVotes, type: typeof(IntGraphType));
        }
    }
}