import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { paths } from "../../paths";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { getAuthClient } from "../../services/auth";
import { useUser } from "../../hooks/use-user";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

const schema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod
    .string()
    .min(1, { message: "Password should be at least 1 characters" }),
});

const defaultValues = { name: "", email: "", password: "" };

export function SignUpForm() {
  const navigate = useNavigate();

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
      const res = await getAuthClient().signUp(values);
      const { error } = res;
      if (error) {
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      navigate(paths.auth.signIn);
    },
    [checkSession, setError]
  );
  return (
    <div className="mb-4">
      {/* Header Section */}
      <div className="mb-3">
        <h2 className="mb-1 fw-bold">Sign up</h2>
        <p className="text-secondary small">
          Already have an account?{" "}
          <Link to={paths.auth.signIn} className="text-primary fw-bold">
            Sign in
          </Link>
        </p>
      </div>
      {errors.root ? (
        <Alert variant="danger">{errors.root.message}</Alert>
      ) : null}
      {/* Form Section */}
      <Form onSubmit={handleSubmit(onSubmit, (data) => console.log({ data }))}>
        {/* First Name */}
        <Form.Group className="mb-3">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <>
                <Form.Label className="text-secondary fw-bold">
                  {" "}
                  {/* small and fw-bold to mimic MUI label */}
                  Name
                </Form.Label>
                <Form.Control
                  {...field}
                  type="text"
                  placeholder="Enter your name"
                  className="form-control-md p-3"
                />
                {errors.name ? (
                  <Alert variant="danger">{errors.name.message}</Alert>
                ) : null}
              </>
            )}
          />
        </Form.Group>

        {/* Email */}
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

        {/* Password */}
        <Form.Group className="mb-3">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <>
                <Form.Label className="text-secondary fw-bold">
                  {" "}
                  Password
                </Form.Label>
                <Form.Control
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                  className="form-control-md p-3"
                />
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
          Sign up
        </Button>
      </Form>
    </div>
  );
}
