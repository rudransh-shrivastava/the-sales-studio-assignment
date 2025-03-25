import { getSession } from "../../auth";

export default async function Home() {
  const session = await getSession();
  return (
    <div>
      add a way to claim a coupon here You are currently signed in as{" "}
      {session?.user?.email}
    </div>
  );
}
