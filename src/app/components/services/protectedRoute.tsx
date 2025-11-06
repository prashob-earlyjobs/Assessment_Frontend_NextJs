"use client";

import { FC, ReactNode, Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { isUserLoggedIn } from "../../components/services/servicesapis";
import { useUser } from "../../context";

const PageLoader: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-saffron-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRouteContent: FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { setUserCredentials } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const loggedIn = await isUserLoggedIn();
        console.log("Authentication response:", loggedIn);

        if (!loggedIn.success || !loggedIn.user) {
          if (isMounted) {
            console.log("User not authenticated, setting isAuthenticated to false");
            setIsAuthenticated(false);
          }
          return;
        }

        if (loggedIn.user.role === "super_admin" || loggedIn.user.role === "franchise_admin") {
          if (isMounted) {
            console.log("Admin user detected, redirecting to /admin");
            setUserCredentials(loggedIn.user);
            router.push("/admin");
          }
          return;
        }

        if (loggedIn.user.role === "creator") {
          if (isMounted) {
            console.log("Creator user detected, redirecting to /creator");
            setUserCredentials(loggedIn.user);
            router.push("/creator");
          }
          return;
        }

        if (isMounted) {
          console.log("Non-admin user authenticated, setting isAuthenticated to true");
          setIsAuthenticated(true);
          setUserCredentials(loggedIn.user);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        if (isMounted) {
          console.log("Error occurred, setting isAuthenticated to false");
          setIsAuthenticated(false);
        }
      }
    };

    if (isAuthenticated === null) {
      console.log("Checking authentication status...");
      checkAuth();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, setUserCredentials, router]);

  if (isAuthenticated === null) {
    return null; // Let Suspense handle the loading state
  }

  if (!isAuthenticated) {
    const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    const redirectPath = pathname && pathname !== "/login" ? fullPath : "/";
    console.log("Storing redirect path in localStorage:", redirectPath);
    localStorage.setItem("redirectAfterLogin", redirectPath);
    console.log("User not authenticated, redirecting to /login");
    router.replace("/login");
    return null;
  }

  console.log("User authenticated, rendering children");
  return <>{children}</>;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRouteContent>{children}</ProtectedRouteContent>
    </Suspense>
  );
};

export default ProtectedRoute;