using GraphQL.Types;

namespace Dieter.API.Models.GraphQL.InputTypes
{
    public class AddPhotoInputType : InputObjectGraphType<PhotoType>
    {
        public AddPhotoInputType()
        {
            Name = "AddPhotoInput";

            Field<NonNullGraphType<GraphType>>("photo");
        }
    }
}