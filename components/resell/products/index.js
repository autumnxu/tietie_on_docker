import { Box, Container } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import AddResellProductDrawer from "../add_product_form/add_product_drawer";
import { Fragment } from "react";
import ProductsList from "./product_list";
function Products(props) {
  const  { products } = props; 

  return (
    <Fragment>
      <Container centerContent>
        <h1>resell products</h1>

      <AddResellProductDrawer></AddResellProductDrawer>
      <ul>{<ProductsList products={products} />}</ul>
      </Container>
    </Fragment>
  );
}

export default Products;
