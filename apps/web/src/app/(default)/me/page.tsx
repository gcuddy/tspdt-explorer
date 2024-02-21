import { getPageSession } from "@/core/auth/validate";
import Me from "./me";

export default async function Page() {
  const session = await getPageSession();

  return <Me session={session} />;
}
