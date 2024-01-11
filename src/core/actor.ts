import { z } from "zod";
import { Context } from "./context";

export const UserActor = z.object({
  type: z.literal("user"),
  properties: z.object({
    userID: z.string().cuid2(),
    // workspaceID: z.string().cuid2(),
  }),
});
export const SystemActor = z.object({
  type: z.literal("system"),
  properties: z.object({
    // workspaceID: z.string().cuid2(),
  }),
});
export type SystemActor = z.infer<typeof SystemActor>;

export const Actor = z.discriminatedUnion("type", [UserActor, SystemActor]);
export type Actor = z.infer<typeof Actor>;

const ActorContext = Context.create<Actor>("actor");

export const useActor = ActorContext.use;
export const withActor = ActorContext.with;

const UserContext = Context.create<{ userID?: string }>("user");
export const withUser = UserContext.with;
// export const useUser = UserContext.use;

export const useUser = () => {
  const u = UserContext.use();
  if (!u.userID) throw new Error(`Expected user to have userID`);
  return u.userID;
};

// export function useUser() {
//   const actor = useActor();
//   if ("userID" in actor.properties) return actor.properties.userID;
//   throw new Error(`Expected actor to have workspaceID`);
// }

// TODO
// export function useActor() {
//   return "test-id";
// }
