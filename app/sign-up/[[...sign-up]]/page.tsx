import { SignUp } from "@clerk/nextjs";

import { AuthLayout, authAppearance } from "@/components/auth/auth-layout";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp appearance={authAppearance} />
    </AuthLayout>
  );
}