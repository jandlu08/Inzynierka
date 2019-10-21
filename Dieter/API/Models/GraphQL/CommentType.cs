using GraphQL.Types;

namespace Dieter.API.Models.GraphQL
{
    public class CommentType : ObjectGraphType<Comment>
    {
        public CommentType()
        {
            Name = "Comment";
            Field(x => x.CommentId, type: typeof(IdGraphType));
            Field(x => x.Author, type: typeof(UserType));
            Field(x => x.Content, type: typeof(StringGraphType));
            Field(x => x.Rating, type: typeof(RatingType));
            Field(x => x.PublicationDate, type: typeof(DateGraphType));
        }
    }
}