import React from "react"
import axios from "axios"
import { saveAs } from "file-saver"
import { Flex, Box, Text, Grid, Divider, useToast } from "@chakra-ui/react"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import CartItem from "./CartItem"
import Summary from "./Summary"
import { baseUrl } from "../../utils/url"

import { useSelector, useDispatch } from "react-redux"
import {
  removeFromCart,
  verifyCoupon,
  clearCart,
  onOpen,
  onClose,
} from "../../redux/actions/cart.action"
import { isValidEmail } from "../../utils/utils"

// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"

const Cart = () => {
  const dispatch = useDispatch()
  const toast = useToast()

  const {
    count,
    prevCount,
    cartItems,
    total: subtotal,
    loading,
    discount,
    couponError,
  } = useSelector(state => state.cart)

  const [email, setEmail] = React.useState("")
  const [checkoutError, setCheckoutError] = React.useState(null)
  const [checkoutLoading, setCheckoutLoading] = React.useState(false)

  let total = subtotal
  if (discount) {
    const { num } = discount
    const percentToDecimal = num / 100
    const priceDeducted = total * percentToDecimal
    const newPrice = total - priceDeducted
    total = Number(newPrice.toFixed(2))
  }

  // const config = {
  //   public_key: process.env.REACT_APP_FLW_PUB_KEY,
  //   tx_ref: Date.now().toString(),
  //   amount: total,
  //   currency: "USD",
  //   payment_options: "card, mobilemoney, ussd, paypal",
  //   customer: {
  //     email,
  //   },
  //   customizations: {
  //     title: "SCI Reports",
  //     description: "Payment for digital reports in cart",
  //     logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  //   },
  // }

  // const handleFlutterPayment = useFlutterwave(config)

  // const [isPaymentSuccessful, setIsPaymentSuccessful] = React.useState(false);
  React.useEffect(() => {
    if (count === 0) dispatch(onClose())
  }, [count, prevCount, cartItems, toast, dispatch])

  // const callback = response => {
  //   const { status } = response
  //   if (status === "successful") {
  //     // setIsPaymentSuccessful(true);
  //     dispatch(clearCart())
  //     dispatch(onClose())
  //     // checkout(response)
  //     freeCheckout(response)
  //     closePaymentModal()
  //   } else {
  //     dispatch(onOpen())
  //   }
  //   closePaymentModal() // this will close the modal programmatically
  // }

  const freeCheckout = () => {
    if (!isValidEmail(email)) {
      setCheckoutError("Please provide a valid email address")
    } else {
      setCheckoutError(null)
      setCheckoutLoading(true)

      let reports = []
      cartItems.map(item => reports.push(item.Country))

      let body = {
        free_reports: reports,
        email,
      }

      if (discount) {
        const { code } = discount
        body = {
          ...body,
          discountCode: code,
        }
      }

      let fileName, type
      if (reports.length === 1) {
        fileName = `SCI Trade Opportunity Report - ${reports[0]}`
        type = "Application/pdf"
      } else {
        fileName = "SCI Trade Opportunity Reports.zip"
        type = "octet/stream"
      }

      let config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "blob",
      }

      axios
        .post(`${baseUrl}/reports/free/plan`, { ...body }, config)
        .then(response => {
          const { status } = response
          if (status === 200) {
            dispatch(clearCart())
            // dispatch(onClose())
          } else {
            dispatch(onOpen())
          }

          const blob = new Blob([response.data], {
            type,
          })
          saveAs(blob, fileName)
        })
      setTimeout(() => {
        setCheckoutLoading(false)
        toast({
          title: "Order placed.",
          description:
            reports.length === 1
              ? `Document will be auto-downloaded after being processed.
              Please do not close browser tab or navigate to another page on this website.`
              : `Documents will be auto-downloaded after being processed.
              Please do not close browser tab or navigate to another page on this website.`,
          status: "success",
          duration: 9900,
          isClosable: true,
          position: "top-right",
        })
        dispatch(onClose())
      }, 3500)
    }
  }

  // const checkout = fw_response => {
  //   let reports = []
  //   cartItems.map(item => reports.push(item.Country))
  //   let body = {
  //     ...fw_response,
  //     customer: {
  //       email,
  //     },
  //     reports_purchased: reports,
  //   }
  //   if (discount) {
  //     const { code } = discount
  //     body = {
  //       ...body,
  //       discountCode: code,
  //     }
  //   }

  //   let fileName, type
  //   if (reports.length === 1) {
  //     fileName = `SCI Trade Opportunity Report - ${reports[0]}`
  //     type = "Application/pdf"
  //   } else {
  //     fileName = "SCI Trade Opportunity Reports.zip"
  //     type = "octet/stream"
  //   }
  //   let config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     responseType: "blob",
  //   }

  //   axios
  //     .post(`${baseUrl}/report/flutterwave/verification`, { ...body }, config)
  //     .then(res => {
  //       const blob = new Blob([res.data], {
  //         type,
  //       })
  //       saveAs(blob, fileName)
  //     })
  // }

  return (
    <>
      <Box display={["block", "none"]}>
        <Flex
          spacing='10px'
          alignItems='center'
          height='44px'
          padding='0 18px'
          background='#FBFBFD'
          borderTop='1px solid rgba(130, 127, 152, 0.2)'
          borderBottom='1px solid rgba(130, 127, 152, 0.2)'
        >
          <ChevronLeftIcon
            boxSize='24px'
            ml='-6px'
            onClick={() => dispatch(onClose())}
          />
          <Text
            color='#2A2A2A'
            fontSize={14}
            fontWeight={400}
            onClick={() => dispatch(onClose())}
          >
            Back
          </Text>
        </Flex>
      </Box>
      <Grid
        gridTemplateColumns={["1fr", "4fr 3fr"]}
        backgroundColor='#FFFFFF'
        overflowY='scroll'
      >
        <Box padding={["18px 18px 50px", "24px 30px 100px"]}>
          <Text
            color='#2C2C2C'
            fontSize={18}
            fontWeight={700}
            mb={["16px", "26px"]}
          >
            Reports Cart
          </Text>
          <Divider color='rgba(130, 127, 152, 0.1)' />
          <Flex
            justifyContent='space-between'
            color='#565656'
            fontSize={10}
            lineHeight='150%'
            padding='6px 0'
          >
            <Text>REPORT DETAILS</Text>
            <Text>PRICE</Text>
          </Flex>
          <Divider color='rgba(130, 127, 152, 0.1)' mb='18px' />
          <Divider color='rgba(130, 127, 152, 0.1)' />
          {cartItems.map((item, index) => {
            return (
              <CartItem
                item={item}
                key={index}
                removeItem={id => dispatch(removeFromCart(id))}
              />
            )
          })}
        </Box>
        <Box
          padding={["18px", "24px 28px"]}
          backgroundColor={["transparent", "#F5F5F6"]}
        >
          <Summary
            count={count}
            total={total}
            // subtotal={subtotal}
            subtotal={0}
            verifyCoupon={code => dispatch(verifyCoupon(code))}
            loading={loading}
            discount={discount}
            error={couponError}
            email={email}
            setEmail={setEmail}
            checkoutLoading={checkoutLoading}
            checkoutError={checkoutError}
            initializePayment={() => {
              // dispatch(onClose())
              freeCheckout()
            }}
            // initializePayment={() => {
            //   dispatch(onClose())
            //   handleFlutterPayment({
            //     callback: callback,
            //     onClose: () => {
            //       dispatch(onOpen())
            //     },
            //   })
            // }}
          />
        </Box>
      </Grid>
    </>
  )
}

export default Cart
