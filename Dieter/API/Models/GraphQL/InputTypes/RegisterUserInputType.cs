using GraphQL.Types;

namespace Dieter.API.Models.GraphQL.InputTypes
{
    public class RegisterUserInputType : ObjectGraphType
    {
        public RegisterUserInputType()
        {
            Name = "RegisterUserInput";
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<StringGraphType>("firstName");
            Field<StringGraphType>("lastName");
            Field<NonNullGraphType<StringGraphType>>("email");
            Field<SexEnum>("sex");
        }
    }
}