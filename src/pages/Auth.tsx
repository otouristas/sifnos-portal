import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForms } from "@/components/auth/auth-forms";
import { useAuth } from "@/hooks/use-auth";

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <AuthForms />;
};

export default Auth;