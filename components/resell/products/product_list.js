import {
    Box,
    Container,
    useToast,
    Badge,
    StarIcon,
    Button,
  } from "@chakra-ui/react";
  import Link from "next/link";
  import { useState, useEffect, useRef } from "react";
  import { getSession } from "next-auth/client";
//   import { lowerExp } from "../../../requests/course/course";
//   import { server } from "../../../config";
  
  function ProductsList(props) {
    const toast = useToast();
    const titleInputRef = useRef();
    var { products } = props;
  
    const [isLoading, setIsLoading] = useState(true);
    const [loadedSession, setLoadedSession] = useState();
  
    useEffect(() => {
      getSession().then((session) => {
        setLoadedSession(session);
        // console.log("about to console log session");
        // console.log(session);
        setIsLoading(false);
      });
    }, []);
  
    // const expHandler = (event, id) => {
    //   // event.preventDefault();
    //   const email = loadedSession?.user.email;
    //   if (!email) {
    //     alert("please login");
    //     window.location.href = `${server}/log_sign_in`;
    //   }
    //   const title = event.target.innerHTML;
    //   // const result = lowerExp(email, title);
  
    //   var reqBody = {
    //     title: title,
    //     posterId: email,
    //   };
    //   fetch(`${server}/api/exp/exp_cal`, {
    //     method: "POST",
    //     body: JSON.stringify(reqBody),
    //     headers: { "Content-Type": "application.json" },
    //   }).then((res) => {
    //     if (!res.ok) {
    //       res.json().then((err) => {
    //         if (
    //           err.message ==
    //           "insufficient exp, please contribute to the site before viewing"
    //         ) {
    //           toast({
    //             title: "insufficient exp",
    //             description: "please contribute to the site before viewing",
    //             status: "error",
    //             duration: 2000,
    //             isClosable: true,
    //           });
    //         }
    //       });
    //       // console.log(id);
    //     } else {
    //       window.location.href = `${server}/course_evaluation/${id}`;
    //     }
    //   });
    // };
    const productsList = products?.map((product) => (
      // <li key={course.id}>
      <Box
        minW="md"
        borderWidth="1px"
        mt="2"
        borderRadius="lg"
        overflow="hidden"
        key={product.id}
      >
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New Post!
            </Badge>
          </Box>
  
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {/* <Link href={`/course_evaluation/${course.id}`}> */}
            <p onClick={() => expHandler(event, product.id)}>{product.title}</p>
            {/* </Link> */}
          </Box>
  
          <Box>
            <p>Tag: {product.tag}</p>
            <p>Price: {product.price}</p>
          </Box>
  
          <Box display="flex" mt="2" alignItems="center">
            {/* <Link href={`/course_evaluation/${course.id}`}> */}
            <Button
              colorScheme="red"
              onClick={() => expHandler(event, product.id)}
            >
              {" "}
              see details
            </Button>
            {/* </Link> */}
          </Box>
        </Box>
      </Box>
      // </li>
    ));
  
    return <ul>{productsList}</ul>;

  }
  
  export default ProductsList;
  