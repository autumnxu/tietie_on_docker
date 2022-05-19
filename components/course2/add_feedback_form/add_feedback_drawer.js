import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  AddIcon,
  Stack,
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { Fragment } from "react";
import AddCourseFrom from ".";
import { useSession, getSession, signOut } from "next-auth/client";

function AddFeedbackDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    getSession().then((session) => {
      setLoadedSession(session);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {loadedSession && (
        <Button ref={btnRef} colorScheme="red" onClick={onOpen}>
          Add My Course Evaluation
        </Button>
      )}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Course Evaluation</DrawerHeader>

          <AddCourseFrom></AddCourseFrom>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AddFeedbackDrawer;
