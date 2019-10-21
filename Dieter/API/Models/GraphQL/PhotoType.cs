using GraphQL.Types;

namespace Dieter.API.Models.GraphQL
{
    public class PhotoType : ObjectGraphType<Photo>
    {
        public PhotoType()
        {
            Name = "Photo";
            Field(x => x.PhotoId, type: typeof(IdGraphType));
            Field(x => x.Image, type: typeof(ByteGraphType));
        }
    }
}