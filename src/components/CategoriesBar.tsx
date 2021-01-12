import React from 'react'
import { Box, Text, Flex, PseudoBoxProps } from '@chakra-ui/core';
import { NavLink, useLocation } from 'react-router-dom';

import { paths } from '../constants';

type CategoryLinkProps = {
  name: string;
  path: string;
}

const CategoryLink: React.FC<CategoryLinkProps> = (props) => {
  const location = useLocation();
  const { name, path } = props;
  const activeLinkStyle: PseudoBoxProps = {
    backgroundColor: "gray.900",
    color: "white",
  }

  return (
    <NavLink to={path}>
      <Text mx={5} py={1} px={3} {...location.pathname === path ? activeLinkStyle : ""}>{name}</Text>
    </NavLink>
  )
}

const CategoriesBar: React.FC<{}> = () => {
  return (
    <Box borderBottom="1px" borderBottomColor="gray.300" backgroundColor="gray.100">
      <Flex maxWidth={{ base: "100%", lg: "900px", xl: "1200px" }} alignItems="center" margin="auto" fontWeight="bold" justifyContent="center" py={5}>
        {paths.map((path, idx: number) => (
          <CategoryLink key={idx} name={path.name} path={path.path}/>
        ))}
      </Flex>
    </Box>
  )
}

export default CategoriesBar;