import { SignIn } from "@clerk/nextjs";

import { AuthLayout, authAppearance } from "@/components/auth/auth-layout";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn appearance={authAppearance} />
    </AuthLayout>
  );
}