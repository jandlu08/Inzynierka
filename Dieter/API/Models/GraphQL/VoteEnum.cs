using GraphQL.Types;

namespace Dieter.API.Models.GraphQL
{
    public class VoteEnum : EnumerationGraphType
    {
        public VoteEnum()
        {
            Name = "VoteEnum";
            AddValue("UP","",1);
            AddValue("DOWN","",-1);
        }
    }
}