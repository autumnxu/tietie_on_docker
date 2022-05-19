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
import AddCommentsFrom from ".";
import { useSession, getSession, signOut } from "next-auth/client";

function AddCommentDrawer(props) {
  var { post_id } = props;

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
          Add Comments
        </Button>
      )}
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Course Evaluation</DrawerHeader>

          <AddCommentsFrom post_id={post_id}></AddCommentsFrom>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AddCommentDrawer;
