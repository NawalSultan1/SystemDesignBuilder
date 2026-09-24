import { SignIn } from "@clerk/nextjs";

import { AuthLayout, authAppearance } from "@/components/auth/auth-layout";

export default function SignInPage() {
  return (
    <AuthLayout mode="sign-in">
      <SignIn appearance={authAppearance} />
    </AuthLayout>
  );
}