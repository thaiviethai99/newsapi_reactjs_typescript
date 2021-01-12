import React from 'react'
import { Box, Heading, Image, Stack, Text } from '@chakra-ui/core';

import { IArticle } from '../constants/types';
import { formatDate } from '../utils';

type CategoryBoxProps = {
  category: string;
  data: IArticle[];
}

const CategoryBox: React.FC<CategoryBoxProps> = (props) => {

  const { category, data } = props;

  return (
    <Box>
      <Box backgroundColor="black" pt={1}>
        <Heading color="white" size="xl">{category}</Heading>
      </Box>
      {data.map((article, idx: number) => (
        <Stack key={idx} spacing={5} isInline alignItems="center">
          <Box width="30%">
            <Image
              src={article?.urlToImage ?? "https://dummyimage.com/160x100/e2e8f0/fff"}
              alt={`Image of ${article?.title}`}
              width="100%"
              height="auto"
              objectFit="contain"
              my={5}
            />
          </Box>
          <Box width="70%">
            <Stack spacing={3}>
              <Heading size="md">{article?.title}</Heading>
              <Text color="gray.500" fontSize="sm">{formatDate(article?.publishedAt)}</Text>
              <Text isTruncated>{article?.content}</Text>
            </Stack>
          </Box>
        </Stack>
      ))}
    </Box>
  )
}

export default CategoryBox;
