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

export function Card({ title, imageSrc, tags, description, buttonText, url }: CardProps) {
  let link = url;
  return (
    // <Center as='section' bg='blue.500' h='100vh' >
    <div className='flex flex-col bg-gray-600 rounded-xl'>
      <Box maxW='600px' p='6'>
        <Heading my='4' size='lg'>
          {title}
        </Heading>
        <Image
          src={imageSrc}
          alt={title}
          borderRadius='xl'
          objectFit='cover'
          mx='auto'
          className='h-[300px] w-full'
        />
        <HStack mt='5' spacing='3'>
          {tags.map((tag) => (
            <Tag key={tag} variant='outline'>
              {tag}
            </Tag>
          ))}
        </HStack>
        <Text className='text-slate-300'>{description}</Text>
        <Center my='6'>
          <Link href={link} passHref>
            <Button className='text-white bg-purple-500 hover:bg-purple-900'>{buttonText}</Button>
          </Link>
        </Center>
      </Box>
    </div>
  );
}
