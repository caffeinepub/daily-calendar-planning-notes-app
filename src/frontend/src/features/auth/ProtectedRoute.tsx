import { useEffect } from "react";
import { navigate } from "../../router";
import { isLoggedIn } from "./authUtils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, []);

  if (!isLoggedIn()) {
    return null;
  }

  return <>{children}</>;
}
