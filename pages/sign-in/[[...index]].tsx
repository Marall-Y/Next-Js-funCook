import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="w-full flex justify-center align-middle mt-24 mb-10">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
  );

export default SignInPage;