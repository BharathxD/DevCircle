"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import Modal from "../UI/Modal";
import getCurrentUser from "@/actions/getCurrentUser";
import OAuthSignIn from "../Auth/OAuthSignIn";

const AuthModal = async () => {
  const currentUser = await getCurrentUser();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (currentUser) {
      router.refresh();
      onClose();
    }
  }, [currentUser, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome back"
      description="Login to your account."
      isOpen={isOpen}
      onChange={onChange}
    >
      <OAuthSignIn />
    </Modal>
  );
};

export default AuthModal;
