import React from "react"
import numeral from "numeral"
import {
  Flex,
  Text,
  VStack,
  Divider,
  Input,
  Button,
  Box,
} from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { CheckIcon } from "@chakra-ui/icons"
import { couponError } from "../../redux/actions/cart.action"

const Summary = ({
  count,
  subtotal,
  total,
  verifyCoupon,
  loading,
  initializePayment,
  discount,
  error,
  email,
  setEmail,
  checkoutLoading,
  checkoutError,
}) => {
  const dispatch = useDispatch()
  const [couponCode, setCouponCode] = React.useState("")

  const handleCouponField = e => {
    const { value } = e.target
    setCouponCode(value)
    if (error) dispatch(couponError(""))
  }
  React.useEffect(() => {
    if (discount) {
      const { code } = discount
      setCouponCode(code)
    }
  }, [discount])
  return (
    <>
      <Text
        color='#2C2C2C'
        fontSize={18}
        fontWeight={700}
        mb='26px'
        display={["none", "block"]}
      >
        Order Summary
      </Text>
      <Divider
        color='rgba(130, 127, 152, 0.3)'
        mb='21px'
        display={["none", "block"]}
      />
      <Flex
        flexDirection='column'
        minHeight={["310px"]}
        justifyContent='space-between'
      >
        <Flex justifyContent='space-between'>
          <Text color='#161616' fontSize={12} fontWeight={600}>
            {count <= 1 ? `${count} ITEM` : `${count} ITEMS`}
          </Text>
          <Text color='#161616' fontSize={12} fontWeight={600}>
            {numeral(subtotal).format("$0.00")}
          </Text>
        </Flex>
        <Box>
          <Flex
            border={error ? "1px solid #FF9494" : "1px solid #C0C0C0"}
            background='rgba(255, 255, 255, 0.1)'
            h='64px'
            width='100%'
            justifyContent='space-between'
            alignItems='center'
            padding='0 16px'
          >
            <VStack
              spacing='0px'
              alignItems='flex-start'
              flexGrow={1}
              mr='10px'
            >
              <Text color='#000000' fontSize={12}>
                Discount Code
              </Text>
              <Input
                variant='unstyled'
                placeholder='Enter code here'
                value={couponCode}
                onChange={e => handleCouponField(e)}
                width='100%'
              />
            </VStack>
            {discount ? (
              <CheckIcon color='#4BB543' />
            ) : (
              <Button
                _focus=''
                _hover=''
                color='#115CCC'
                variant='ghost'
                fontWeight={600}
                fontSize={16}
                padding={0}
                isLoading={loading}
                disabled={Boolean(!couponCode)}
                onClick={couponCode ? () => verifyCoupon(couponCode) : null}
              >
                Apply
              </Button>
            )}
          </Flex>
          <Text fontSize={14} color='#FF9494'>
            {error}
          </Text>
          <Flex
            border={checkoutError ? "1px solid #FF9494" : "1px solid #C0C0C0"}
            background='rgba(255, 255, 255, 0.1)'
            h='64px'
            width='100%'
            justifyContent='space-between'
            alignItems='center'
            padding='0 16px'
            mt='26px'
          >
            <VStack spacing='0px' alignItems='flex-start' flexGrow={1}>
              <Text color='#000000' fontSize={12}>
                Email address
              </Text>
              <Input
                variant='unstyled'
                placeholder='Enter your email'
                value={email}
                autoFocus
                onChange={e => setEmail(e.target.value)}
                width='100%'
              />
            </VStack>
          </Flex>
          <Text fontSize={14} color='#FF9494'>
            {checkoutError}
          </Text>
        </Box>
        <Flex>
          <Button
            _focus=''
            _hover=''
            color='#ffffff'
            background='#004AD9'
            width='100%'
            height='64px'
            fontFamily='Gilroy, sans-serif'
            fontSize={16}
            fontWeight={700}
            borderRadius={0}
            onClick={initializePayment}
            disabled={!email}
            isLoading={checkoutLoading}
          >
            Checkout
            {/* Checkout - {numeral(total).format("$0.00")} */}
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default Summary
