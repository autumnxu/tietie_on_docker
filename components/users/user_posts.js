import { useToast } from "@chakra-ui/react";

import classes from "./users.module.css";

import Link from "next/link";
import { server } from "../../config";

const deletPostHandler = (id, toast) => {
  // console.log(id);
  var reqBody = {
    postId: id,
  };
  fetch(`${server}/api/users/delete_post`, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application.json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message == "the course evaluation is deleted") {
        toast({
          title: "Delete",
          description: "the course evaluation is deleted",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    });
  window.location.reload();
};

function UserPosts(props) {
  const toast = useToast();
  var { posts } = props;

  const user_post_list = posts?.map(
    (post) => (
      <li key={post.id}>
        <Link href={`/course_evaluation/${post.id}`}>{post.title}</Link>{" "}
        <button
          className={classes.toggle}
          onClick={() => deletPostHandler(post.id, toast)}
        >
          x
        </button>
      </li>
    )
    // console.log(c)
  );

  return <ul>{user_post_list}</ul>;
}

export default UserPosts;
