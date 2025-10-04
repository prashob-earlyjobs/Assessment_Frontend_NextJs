"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { ArrowLeft, Bell, LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";
import { isUserLoggedIn, userLogout } from "../services/servicesapis";
import { useUser } from "../../context";

const notifications = [
  {
    id: 1,
    title: "You're All Set to Begin! 🚀",
    message:
      "Welcome to EarlyJobs Assessments. A new challenge awaits—give it your best shot!",
    unread: true,
  },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { userCredentials, setUserCredentials } = useUser();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (!response.success) {
        throw new Error("Logout failed");
      }
      toast.success("Logged out successfully!");
      setUserCredentials(null);
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    if (showNotifications === true) {
      notifications.forEach((notification) => {
        if (notification.unread) {
          notification.unread = false;
        }
      });
    }
  }, [showNotifications]);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/images/logo.png"
              onClick={() => router.push("/")}
              alt="EarlyJobs Logo"
              className="h-[4rem] w-auto cursor-pointer"
            />
          </div>

          {userCredentials !== null ? (
            <div className="flex items-center space-x-4">
              <Popover
                open={showNotifications}
                onOpenChange={setShowNotifications}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative rounded-full w-10 h-10 p-0"
                  >
                    <Bell className="h-5 w-5" />
                    {notifications.some((n) => n.unread) && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Notifications</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowNotifications(false)}
                      >
                        Mark all as read
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg border ${
                            notification.unread
                              ? "bg-blue-50 border-blue-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <h5 className="font-medium text-sm">
                            {notification.title}
                          </h5>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                    onClick={handleProfileClick}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={userCredentials?.avatar}
                        alt={userCredentials?.name}
                      />
                      <AvatarFallback>
                        {userCredentials?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="end">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={userCredentials?.avatar}
                          alt={userCredentials?.name}
                        />
                        <AvatarFallback>
                          {userCredentials?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{userCredentials?.name}</p>
                        <p className="text-sm text-gray-500">
                          {userCredentials?.email}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => router.push("/profile")}
                    >
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => router.push("/dashboard")}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => router.push("/assessments")}
                    >
                      Assessments
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => router.push("/jobs")}
                    >
                      Jobs
                    </Button>
                    <hr />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setShowLogoutDialog(true)}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/login")}
                className="text-gray-700 hover:text-gray-900"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                className="bg-earlyjobs-orange hover:bg-earlyjobs-orange/90"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>

      <AlertDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will log you out of your account. You'll need to log in again
              to access your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Header;
