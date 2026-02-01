import React from "react"
import numeral from "numeral"
import { Flex, Box, Text, VStack, Image } from "@chakra-ui/react"

const CartItem = ({ item, removeItem }) => {
  // console.log(item);
  const { Country, Report_name, Report_cover_images_svg } = item
  return (
    <Flex alignItems='center' padding='8px 0'>
      <Box
        h='78px'
        width='60px'
        padding='6px 5px'
        backgroundColor='#E1E0E0'
        mr='16px'
      >
        <Image
          src={Report_cover_images_svg?.no_shadow}
          width='100%'
          height='100%'
        />
      </Box>
      <VStack spacing='10px' alignItems='flex-start' flexGrow={1}>
        <Flex justifyContent='space-between' alignItems='center' width='100%'>
          <Text
            color='#2C2C2C'
            fontSize={14}
            fontWeight={600}
            lineHeight='123.2%'
            maxWidth='130px'
          >
            {Report_name}
          </Text>
          <Text
            color='#2C2C2C'
            fontSize={14}
            fontWeight={600}
            lineHeight='123.2%'
          >
            {numeral(0).format("$0.00")}
            {/* {numeral(Report_price).format('$0.00')} */}
          </Text>
        </Flex>
        <Text
          color='#FF0000'
          fontSize={10}
          cursor='pointer'
          onClick={() => removeItem(Country)}
        >
          REMOVE
        </Text>
      </VStack>
    </Flex>
  )
}

export default CartItem
