import { queryType, stringArg, objectType, makeSchema } from "@nexus/schema";

const ServTimeOutputType = objectType({
  name: "ServTimeOutputType",
  definition(t) {
    t.string("time", { nullable: false, description: "time" });
  },
});

const Query = queryType({
  definition(t) {
    t.field("serv_time", {
      type: ServTimeOutputType,
      args: { type: stringArg() },
      async resolve(_, args, { prisma }) {
        console.log(args);
        const data = await prisma.user.findMany()
        console.log(data);
        return { time: String(Date.now()) };
      },
    });
  },
});

export const servTimeSchema = makeSchema({
  types: [ServTimeOutputType, Query],
});
