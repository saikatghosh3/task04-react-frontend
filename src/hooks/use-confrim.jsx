import { useState, useCallback } from "react";

export function useConfirmAction() {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState(null);
  const [confirmingAction, setConfirmingAction] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => async() => {});

  const openModal = useCallback((actionType, confirmCallback) => {
    setAction(actionType);
    setOnConfirm(() => async() => await confirmCallback());
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleConfirm = useCallback(() => {
    setConfirmingAction(true);
    
    // Wait for the onConfirm action to complete
    Promise.resolve(onConfirm()).then(() => {
      setConfirmingAction(false);
      closeModal(); // Close the modal only after action is done
    });
  }, [onConfirm, closeModal]);

  return {
    showModal,
    action,
    confirmingAction,
    openModal,
    closeModal,
    handleConfirm
  };
}
