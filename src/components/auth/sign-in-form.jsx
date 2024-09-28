import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { paths } from "../../paths";
import { useCallback, useState } from "react";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { getAuthClient } from "../../services/auth";
import { useUser } from "../../hooks/use-user";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod.string().min(1, { message: "Password is required" }),
});

const defaultValues = { email: "", password: "" };

export function SignInForm() {
  const navigate = useNavigate();
  const [isEyeoff, setIsEyeOff] = useState(true);
  const { checkSession } = useUser();
  const [isPending, setIsPending] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = useCallback(
    async (values) => {
      setIsPending(true);
      const { error } = await getAuthClient().signInWithPassword(values);
      if (error) {
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      }
      // Refresh the auth state
      await checkSession?.();
      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      navigate(paths.dashboard.home);
    },
    [checkSession, setError]
  );
  return (
    <div className="mb-4">
      {/* Header Section */}
      <div className="mb-3">
        <h2 className="mb-1 fw-bold"> Sign in</h2>
        <p className="text-secondary small">
          Don't have an account?
          <Link to={paths.auth.signUp} className="text-primary fw-bold">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
      {errors.root ? (
        <Alert variant="danger">{errors.root.message}</Alert>
      ) : null}
      {/* Form Section */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <Form.Group className="mb-3">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <>
                <Form.Label className="text-secondary fw-bold">
                  {" "}
          
                  Email address
                </Form.Label>
                <Form.Control
                  {...field}
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="form-control-md p-3"
                />
                {errors.email ? (
                  <Alert variant="danger">{errors.email.message}</Alert>
                ) : null}
              </>
            )}
          />
        </Form.Group>

        {/* Password Input */}
        <Form.Group className="mb-3">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <>
                <Form.Label className="text-secondary fw-bold">
                  {" "}
                  Password
                </Form.Label>
                <InputGroup className="input-group-md">
                  <Form.Control
                    {...field}
                    className="p-3"
                    autoComplete="current-password"
                    type={isEyeoff ? "password" : "text"}
                    placeholder="Enter your password"
                  />
                  <InputGroup.Text
                    className="bg-transparent border-left-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsEyeOff((prev) => !prev)}
                  >
                    {isEyeoff ? <FiEyeOff /> : <FiEye />}
                  </InputGroup.Text>
                </InputGroup>
                {errors.password ? (
                  <Alert variant="danger">{errors.password.message}</Alert>
                ) : null}
              </>
            )}
          />
        </Form.Group>
        {/* Submit Button */}
        <Button
          disabled={isPending}
          className="w-100"
          variant="primary"
          type="submit"
        >
          Sign in
        </Button>
      </Form>
    </div>
  );
}
