using GraphQL.Types;

namespace Dieter.API.Models.GraphQL.InputTypes
{
    public class AddCommentInputType : InputObjectGraphType
    {
        public AddCommentInputType()
        {
            Name = "AddCommentInput";
            Field<NonNullGraphType<StringGraphType>>("content");
        }
    }
}