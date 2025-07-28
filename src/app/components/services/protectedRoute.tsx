"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const { userCredentials, setUserCredentials } = useUser();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            try {
                const loggedIn = await isUserLoggedIn();
                if (loggedIn.success && loggedIn.user.role !== 'super_admin' && loggedIn.user.role !== 'franchise_admin') {
                    if (isMounted) {
                        setIsAuthenticated(!!loggedIn); // Convert to boolean
                        setUserCredentials(loggedIn.user);
                    }
                } else {
                    throw new Error("Admin shouldn't access this page");
                }
            } catch (error) {
                if (isMounted) {
                    setIsAuthenticated(false);
                }
            }
        };

        if (isAuthenticated === null) {
            checkAuth();
        }

        return () => {
            isMounted = false;
        };
    }, [pathname, setUserCredentials]);

    // Handle redirects based on authentication state
    if (isAuthenticated === null) {
        return <PageLoader />;
    }

    if (!isAuthenticated) {
        router.replace(`/login?from=${encodeURIComponent(pathname)}`);
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;