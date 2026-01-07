import Home from "@/modules/client/auth/components/auth/Home";
import { getServerSession } from "@/modules/server/auth-provider/auth-server";

export const revalidate = 3600; // invalidate every hour (ISR)

async function HomePage() {
  const session = await getServerSession();

  return <Home session={session} />;
}

export default HomePage;
