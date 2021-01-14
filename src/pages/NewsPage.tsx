import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ReactPaginate from 'react-paginate';
import { Heading, Text, Box, Image, Stack, Flex ,Input } from "@chakra-ui/core";

import * as API from "../api";
import { IArticle } from "../constants";
import { TotalResult } from "../constants";
import { Navbar, CategoriesBar, CategoryBox } from "../components";
import { formatDate } from '../utils';
import '../utils/home.css';

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
  const [currentPage, setcurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [query, setQuery] = useState('');

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
      const result = await API.fetchNewsWithCategory('','politics',currentPage,query);
      setPoliticsNewsQuery(result.articles);
      setTotalResult({totalResults:result.totalResults});
      const pageTotal=Math.ceil(result.totalResults/3);
      console.log('pageTotal',pageTotal);
      setPageCount(pageTotal);
    };
 
    fetchData();
  }, [currentPage,query]);

  const handlePageChange = (selectedObject) => {
    const nextPage = selectedObject.selected+ 1;
    setcurrentPage(nextPage);
		//handleFetch();
  };

  const  handleInputChange = (event) => {
    // const target = event.target;
    // const value = target.value;
    // const name = target.name;
    setQuery(event.target.value);
    setcurrentPage(1);
  };
  
  

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
            <>
            <CategoryBox category="Politics" data={politicsNewsQuery} />
            <ReactPaginate
					pageCount={pageCount}
					pageRange={2}
					marginPagesDisplayed={2}
					onPageChange={handlePageChange}
					containerClassName={'container'}
					previousLinkClassName={'page'}
					breakClassName={'page'}
					nextLinkClassName={'page'}
					pageClassName={'page'}
					disabledClassNae={'disabled'}
          activeClassName={'active'}
          forcePage={currentPage -1} 
				/>
         </>
          )}
          
        </Box>
        <Box
          width={{ base: "100%", lg: "30%" }}
          borderLeft="1px"
          borderLeftColor="gray.300"
          pt={5}
          px={5} 
        >
          <Input placeholder="Search" onChange={handleInputChange} /> 
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
