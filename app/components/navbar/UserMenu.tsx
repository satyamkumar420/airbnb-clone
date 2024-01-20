"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModal";
import useRentModel from "@/app/hooks/useRentModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModel();
  const loginModal = useLoginModel();
  const rentModal = useRentModel();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleMenuItemClick = useCallback(() => {
    toggleOpen();
  }, [toggleOpen]);

  const handleLoginClick = () => {
    toggleOpen();
    loginModal.onOpen();
  };

  const handleSignupClick = () => {
    toggleOpen();
    registerModal.onOpen();
  };

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {/* TODO: if click any menu item, close menu */}
                <MenuItem
                  label="My Trips"
                  onClick={() => {
                    router.push("/trips");
                    handleMenuItemClick();
                  }}
                />
                <MenuItem
                  label="My Favorites"
                  onClick={() => {
                    router.push("/favorites");
                    handleMenuItemClick();
                  }}
                />
                <MenuItem
                  label="My Reservations"
                  onClick={() => {
                    router.push("/reservations");
                    handleMenuItemClick();
                  }}
                />
                <MenuItem
                  label="My Properties"
                  onClick={() => {
                    router.push("/properties");
                    handleMenuItemClick();
                  }}
                />
                <MenuItem
                  label="Airbnb my home"
                  onClick={() => {
                    rentModal.onOpen();
                    handleMenuItemClick();
                  }}
                />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={handleLoginClick} />
                <MenuItem label="Sign up" onClick={handleSignupClick} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
