import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Signin from "@/modules/client/auth/components/auth/Signin";
import Signup from "@/modules/client/auth/components/auth/Signup";

async function Login() {
  return (
    <Tabs defaultValue="signin" className="mx-auto w-full my-6 px-4">
      <TabsList>
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Signin />
      </TabsContent>
      <TabsContent value="signup">
        <Signup />
      </TabsContent>
    </Tabs>
  );
}

export default Login;
