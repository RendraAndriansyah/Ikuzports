import React from 'react'
import { Stack, Card, Image } from '@chakra-ui/react'

const CardEventClub = ({children, linkGambar, onClick, key}) => {
  return (
    <div onClick={onClick}>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='filled'
        backgroundColor={'white'}
        mt={'50px'}
        shadow='xl'
        _hover={{cursor: 'pointer'}}
        h={"200px"}
        >
        <Image
          objectFit='contain'
          maxW={{ base: '100%', sm: "300px" }}
          src={linkGambar}
          alt='Picture'
        />
        <Stack w={"100%"}>
          {children}
        </Stack>
      </Card>
    </div>
  )
}

export default CardEventClub