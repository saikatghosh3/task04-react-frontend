import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../paths"; // Assuming this is an object containing route paths.

import { useUser } from "../../hooks/use-user"; 

export function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async () => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      console.debug(
        "[AuthGuard]: User is not logged in, redirecting to sign in"
      );
      navigate(paths.auth.signIn);
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions().catch((e) => {
      console.error(e);
    });
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
