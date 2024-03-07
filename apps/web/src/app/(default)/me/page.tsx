import { getPageSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Me from "./me";

export default async function Page() {
    const { user, session } = await getPageSession();
    console.log({ user, session })
    if (!user) {
        return redirect("/login");
    }
    return <Me user={user} />;
}
