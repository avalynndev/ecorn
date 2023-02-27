import { getServerSession } from "next-auth/next";
import SignOut from "@/components/sign-out";

export default async function AuthStatus() {
  const session = await getServerSession();
  return (
    <>
      <div className="absolute top-5 w-full flex justify-center items-center">
        {session && (
          <p className="text-black-200 text-sm">
            Signed in as {session.user?.email}
          </p>
        )}
      </div>
      <div className="absolute top-5 w-full flex justify-center items-center">
        {session && (
          <>
            <br />
            <br />
            <br />
            <SignOut />
          </>
        )}
      </div>
    </>
  );
}
