import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Heading, Text, Box, Image, Stack, Flex } from "@chakra-ui/core";

import * as API from "../api";
import { IArticle } from "../constants";
import { TotalResult } from "../constants";
import { Navbar, CategoriesBar, CategoryBox } from "../components";
import { formatDate } from '../utils';

const NewsPage: React.FC<{}> = () => {
  const [bannerNews, setBannerNews] = useState<IArticle | null>(null);
  // const politicsNewsQuery = useQuery(["politicsNews", 'politics'], API.fetchNewsWithCategory);
  // const technologyNewsQuery = useQuery(["technologyNews", 'technology'], API.fetchNewsWithCategory)
  // const healthNewsQuery = useQuery(["healthNews", 'health'], API.fetchNewsWithCategory);
  // const sportsNewsQuery = useQuery(["sportsNews", 'sports'], API.fetchNewsWithCategory);
  // const businessNewsQuery = useQuery(["businessNews", 'business'], API.fetchNewsWithCategory);
  //const headlinesQuery = useQuery("headlines", API.fetchEverything);
  const [headlinesQuery, setHeadlinesQuery] = useState<IArticle[]>([]);
  const [politicsNewsQuery, setPoliticsNewsQuery] = useState<IArticle[]>([]);
  const [totalResult, setTotalResult] = useState<TotalResult>({ totalResults:0 });

  useEffect(() => {
    const fetchDataTop = async () => {
      const result = await API.fetchEverything();
      setHeadlinesQuery(result.articles);
    };
 
    fetchDataTop();
  }, []);

  useEffect(() => {
    const fetchDataBanner= async () => {
      const result = await API.fetchEverything();
      setBannerNews(result.articles[0]);
    }
 
    fetchDataBanner();
  }, [headlinesQuery]);
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await API.fetchNewsWithCategory('','politics');
      setPoliticsNewsQuery(result.articles);
      setTotalResult({totalResults:result.totalResults});
    };
 
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <CategoriesBar />
      <Flex
        width="100%"
        maxWidth={{ base: "auto", lg: "900px", xl: "1200px" }}
        margin="auto"
        direction={{ base: "column", lg: "row" }}
      >
        <Box width={{ base: "100%", lg: "70%" }} px={5} pt={5}>
        {(headlinesQuery.length===0)?<p>Loading...</p>:(
            <Box>
              <Stack spacing={2} align="flex-start">
                <Stack spacing={5}>
                  <Heading>{bannerNews?.title}</Heading>
                  {bannerNews?.author && (
                    <Text color="gray.500">by {bannerNews?.author}</Text>
                  )}
                  <Text fontSize="md">{bannerNews?.description}</Text>
                </Stack>
                <Image
                  src={bannerNews?.urlToImage}
                  alt={`Image of ${bannerNews?.title}`}
                  width="100%"
                  my={5}
                />
              </Stack>
            </Box>
          )}
          {totalResult.totalResults>0 && (
            <CategoryBox category="Politics" data={politicsNewsQuery} />
          )}
          
        </Box>
        <Box
          width={{ base: "100%", lg: "30%" }}
          borderLeft="1px"
          borderLeftColor="gray.300"
          pt={5}
          px={5} 
        >
          {headlinesQuery.map(
            (article: IArticle, idx: number) => (
              <Box key={idx} mb={5} py={1}>
                <Stack spacing={2} align="flex-start">
                  <Text fontWeight="700" fontFamily="Playfair Display">
                    {article.title}
                  </Text>
                  <Text as="span" fontSize="sm" color="gray.500">
                    {formatDate(article.publishedAt)}
                  </Text>
                  <Text fontWeight="400" fontSize="xs">
                    {article.description}
                  </Text>
                </Stack>
              </Box>
            )
          )}
        </Box>
      </Flex>
    </>
  );
};

export default NewsPage;
