import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { paths } from "../../paths";
import { useUser } from "../../hooks/use-user";

export function GuestGuard({ children }) {
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

    if (user) {
      console.debug(
        "[GuestGuard]: User is logged in, redirecting to dashboard"
      );
      navigate(paths.dashboard.home); 
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions().catch((e) => {
      // noop
      console.error(e);
    });
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
