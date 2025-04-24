"use client";
import { ReactNode } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title = "Are you sure?",
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <div className="text-sm text-gray-600">{children}</div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700"
            >
              {confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
