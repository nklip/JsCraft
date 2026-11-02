import { Dialog, Portal } from "@chakra-ui/react";
import { useAlertContext } from "../hooks/alertContext";

/**
 * This is a global component that uses context to display a global alert message.
 */
function Alert() {
  const { isOpen, type, message, onClose } = useAlertContext();
  const isSuccess = type === "success"

  return (
    <Dialog.Root
      role="alertdialog"
      // Chakra 3 keeps an alert dialog open on a click outside it, where
      // Chakra 2 closed it. This one has no button, so without the click a
      // touch screen, which has no Escape key, could never dismiss it.
      closeOnInteractOutside
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content py={4} backgroundColor={isSuccess ? '#81C784' : '#FF8A65'}>
            <Dialog.Header fontSize="lg" fontWeight="bold">
              {isSuccess ? 'All good!' : 'Oops!'}
            </Dialog.Header>
            <Dialog.Body>{message}</Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default Alert;
