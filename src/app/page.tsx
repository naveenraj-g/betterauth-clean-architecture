import Home from "@/modules/client/auth/components/auth/Home";
import { getServerSession } from "@/modules/server/auth-provider/auth-server";

async function HomePage() {
  const session = await getServerSession();
  console.log(session);

  return <Home session={session} />;
}

export default HomePage;
