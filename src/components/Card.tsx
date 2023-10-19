import {
    Box,
    Button,
    Center,
    Heading,
    HStack,
    Image,
    Tag,
    Text,
  } from '@chakra-ui/react';
import Link from 'next/link';
  
  type CardProps = {
    title: string;
    imageSrc: string;
    tags: string[];
    description: string;
    buttonText: string;
    url: string;
  };

  export function Card({ title, imageSrc, tags, description, buttonText , url} : CardProps) {
    return (
      <Center as='section' bg='gray.100' h='100vh'>
        <Box maxW='420px' bg='white' p='6'>
          <Image
            src={imageSrc}
            alt={title}
            borderRadius='xl'
            objectFit='cover'
            mx='auto'
          />
          <HStack mt='5' spacing='3'>
            {tags.map((tag) => (
              <Tag key={tag} variant='outline'>
                {tag}
              </Tag>
            ))}
          </HStack>
          <Heading my='4' size='lg'>
            {title}
          </Heading>
          <Text>{description}</Text>
          <Center my='6'>
            <Link href={`/${url}`}>
            <Button colorScheme='blue'>{buttonText}</Button>
            </Link>
          </Center>
        </Box>
      </Center>
    );
  }
  