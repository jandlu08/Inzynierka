using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Dieter.API.Models.GraphQL.DieterMutation;
using Dieter.API.Models.GraphQL.Query;

namespace Dieter.Controllers
{
    [Route("graphql")]
    public class GraphQlController : Controller
    {
        private readonly ResourcesDbContext _db;

        public GraphQlController(ResourcesDbContext db)
        {
            _db = db;
        }

        public async Task<IActionResult> Post([FromBody] GraphQlQuery query)
        {
            var inputs = query.Variables.ToInputs();

            var schema = new Schema()
            {
                Query = new DieterQuery(_db),
                Mutation = new DieterMutation(_db)
            };

            var result = await new DocumentExecuter().ExecuteAsync(_ =>
            {
                _.Schema = schema;
                _.Query = query.Query;
                _.OperationName = query.OperationName;
                _.Inputs = inputs;
            }).ConfigureAwait(false);

            if (result.Errors?.Count > 0)
            {
                return BadRequest();
            }

            return Ok(result);
        }
    }
}