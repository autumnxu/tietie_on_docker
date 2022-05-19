import { useRef, useState, useEffect } from "react";
import {
  Input,
  Stack,
  Container,
  Button,
  Textarea,
  useToast,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { server } from "../../../config";
import { useSession, getSession } from "next-auth/client";

import classes from "./add_product_form.module.css";
import { Fragment } from "react";
function  AddResellForm() {
  const toast=useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    getSession().then((session) => {
      setLoadedSession(session);
      setIsLoading(false);
    });
  }, []);

  const titleInputRef = useRef();
  const productNameInputRef = useRef();
  const productTagInputRef = useRef();
  const priceInputRef = useRef();
  // const difficultyInputRef = useRef();
//   const [workloadInput, setWorkload] = useState(0);
//   const [difficultyInput, setDifficulty] = useState(0);
//   const handleWorkLoadChange = (value) => {
//     setWorkload(value);
//   };
//   const handleDifficultyChange = (value) => {
//     setDifficulty(value);
//   };

  const commentsInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredProductName = productNameInputRef.current.value;
    const enteredProductTag = productTagInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredComment = commentsInputRef.current.value;
    var reqBody = {
      title: enteredTitle,
      productName: enteredProductName,
      productTag: enteredProductTag,
      price: enteredPrice,
      comment: enteredComment,
      posterId: loadedSession.user.email,
    };
    //alert(JSON.stringify(reqBody));
    fetch(`${server}/api/resell/resell_products`, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    // future improvement 
      // toast({
      //   title: "Products Added",
      //   description:"products add",
      //   status: "Success",
      //   duration: 2000,
      //   isClosable: true,
      // });
    window.location.href = `${server}/resell`;
  }
  return (
    <Container>
      <form onSubmit={submitFormHandler} className={classes.actions}>
        <label htmlFor="title">Post Title</label>
        <Input
          focusBorderColor="red.400"
          placeholder="Ex: What a good Table! "
          id="email"
          ref={titleInputRef}
          required="required"
        />
        <br />
        <label htmlFor="productName">Product Name</label>
        <Input
          focusBorderColor="red.400"
          placeholder="Table"
          id="email"
          ref={productNameInputRef}
        />
        <br />

        <label htmlFor="productTag">Product Tag</label>
        <Input
          focusBorderColor="red.400"
          placeholder="Table"
          id="email"
          ref={productTagInputRef}
        />
        <br />

        <label htmlFor="price">Price</label>
        <Input
          focusBorderColor="red.400"
          placeholder="$200"
          id="email"
          ref={priceInputRef}
        />
        <br />
        <label htmlFor="picture">Picture</label>

        

        <label htmlFor="comments">Comment</label>
        <Textarea
          focusBorderColor="red.400"
          placeholder="description"
          id="comments"
          ref={commentsInputRef}
        />
        <button className={classes.toggle}>post comment</button>
      </form>
    </Container>
  );
}

export default AddResellForm;
