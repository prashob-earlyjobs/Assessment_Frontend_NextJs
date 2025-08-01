"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { isUserLoggedIn } from "../../components/services/servicesapis";
import { useAdmin } from "../../context/AdminContext";

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

const ProtectedRouteForAdmin: FC<ProtectedRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const { setCurrentUser } = useAdmin();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            try {
                const loggedIn = await isUserLoggedIn();
                if (!loggedIn || !loggedIn.success) {
                    throw new Error("User is not logged in");
                }
                if (
                    isMounted &&
                    loggedIn.success &&
                    (loggedIn.user.role === "super_admin" || loggedIn.user.role === "franchise_admin")
                ) {
                    setCurrentUser({
                        id: loggedIn.user._id,
                        name: loggedIn.user.name,
                        email: loggedIn.user.email,
                        role: loggedIn.user.role,
                        franchiseId: loggedIn.user?.franchiseId,
                    });
                    setIsAuthenticated(!!loggedIn); // Convert to boolean
                } else {
                    throw new Error("You shouldn't access this page");
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
    }, [pathname, setCurrentUser]);

    // Handle redirects based on authentication state
    if (isAuthenticated === null) {
        return <PageLoader />;
    }

    if (!isAuthenticated) {
        router.replace(`/?from=${encodeURIComponent(pathname)}`);
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRouteForAdmin;