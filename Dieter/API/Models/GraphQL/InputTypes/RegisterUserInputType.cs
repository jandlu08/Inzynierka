﻿using GraphQL.Types;

namespace Dieter.API.Models.GraphQL.InputTypes
{
    public class RegisterUserInputType : InputObjectGraphType
    {
        public RegisterUserInputType()
        {
            Name = "RegisterUserInput";
            Field<NonNullGraphType<StringGraphType>>("userName");
            Field<StringGraphType>("firstName");
            Field<StringGraphType>("lastName");
            Field<NonNullGraphType<StringGraphType>>("email");
            Field<SexEnum>("sex");
        }
    }
}