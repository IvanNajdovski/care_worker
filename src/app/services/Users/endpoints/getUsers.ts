import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { AppContext, User } from "../../../../types";

export class GetUsers extends OpenAPIRoute {
  schema = {
    tags: ["Users"],
    summary: "List Users",
    request: {
      query: z.object({
        page: Num({
          description: "Page number",
          required: false,
        }),
        enabled: Bool({
          description: "Filter by enabled flag",
          required: false,
        }),
      }),
    },
    responses: {
      "200": {
        description: "Returns a list of users",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.object({
                  users: User.array(),
                }),
              }),
            }),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const { page, enabled } = (
      await this.getValidatedData<typeof this.schema>()
    ).query;

    const { results } = await c.env.CARE_DB.prepare(
      `SELECT * FROM users;`
    ).all();
    return { success: true, users: results };
  }
}
