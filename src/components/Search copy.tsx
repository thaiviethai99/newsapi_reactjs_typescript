import React from "react";
import { Flex, Heading } from "@chakra-ui/core";
import { Navbar, CategoriesBar, CategoryBox } from "../components";
interface CategorySearch {
  location:{
    state:{
      results:string
    }
  };
}
const Search:React.FC<CategorySearch> = (props:CategorySearch) => {
  console.log('ket qua search',props.location.state.results);
  const searchString:string=props.location.state.results;
  return (
    <>
    <Navbar />
    <CategoriesBar />
    <h1>{searchString}</h1>
    </>
  );
};

export default Search;
