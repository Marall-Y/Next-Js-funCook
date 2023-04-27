import { SignUp } from "@clerk/nextjs";



const SignUpPage = () => (
  <div className="w-full flex justify-center align-middle" style={{minWidth: 673}}>
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
  );

export default SignUpPage;