"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Modal from "../Modal";
import { HiBars3, HiXMark } from "react-icons/hi2";

const navigation = [
  { name: "Dashboard", href: "/pages/tasks" },
  { name: "Users", href: "/pages/users" },
  { name: "Projects", href: "/pages/project" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Pages that shouldn't show the navbar
  useEffect(() => {
    const authPages = ["/pages/auth/login", "/pages/auth/signup"];
    setShowNavbar(!authPages.includes(pathname));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/pages/auth/login");
  };

  const menuItems = [
    {
      label: "Profile",
      action: () => router.push("/pages/profile"),
    },
    {
      label: "Settings",
      action: () => console.log("Go to settings"),
    },
    {
      label: "Sign Out",
      isDestructive: true,
      action: () => setIsLogoutModalOpen(true),
    },
  ];

  if (!showNavbar) return null;

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <HiBars3
                  className="block size-6 group-data-open:hidden"
                  aria-hidden="true"
                />
                <HiXMark
                  className="hidden size-6 group-data-open:block"
                  aria-hidden="false"
                />
              </DisclosureButton>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Image
                  className="h-8 w-auto"
                  src="/icon.png"
                  width={50}
                  height={50}
                  alt="icon"
                />
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => router.push(item.href)}
                      className={classNames(
                        pathname === item.href
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-300 text-2xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <FaUserCircle />
                  </MenuButton>
                </div>

                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {menuItems.map(({ label, action, isDestructive }) => (
                    <MenuItem key={label}>
                      {({ active }: { active: boolean }) => (
                        <button
                          onClick={action}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "w-full text-left px-4 py-2 text-sm",
                            isDestructive ? "text-red-600" : "text-gray-700"
                          )}
                        >
                          {label}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="button"
                onClick={() => router.push(item.href)}
                className={classNames(
                  pathname === item.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium w-full text-left"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      {/* Logout Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        confirmText="Logout"
        cancelText="Cancel"
      >
        Are you sure you want to log out?
      </Modal>
    </>
  );
};

export default Navbar;
