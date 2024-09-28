import {AuthLayout} from "../components/auth/layout";
import {SignInForm} from "../components/auth/sign-in-form";

export function Login() {
  return (
    <AuthLayout>
        <SignInForm />
    </AuthLayout>
  )
}
