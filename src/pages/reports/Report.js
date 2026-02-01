import React from "react"
import numeral from "numeral"
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Grid,
  useToast,
  Link,
} from "@chakra-ui/react"
import { baseUrl } from "../../utils/url"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, onOpen } from "../../redux/actions/cart.action"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import GoToTop from "../../components/goToTop/GoToTop"

import background_image from "../../assets/hero-bg.svg"

import Shareable from "./Shareable"
import SocialShares from "./SocialShares"
import { CardSkeleton } from "../../components/skeleton/ReportSkeleton"

const backgroundStyle = {
  backgroundImage: `url(${background_image})`,
}

const numberStyle = {
  color: "transparent",
  WebkitTextFillColor: "white" /* Will override color (regardless of order) */,
  WebkitTextStrokeWidth: "1px",
  WebkitTextStrokeColor: "#827F98",
  opacity: 0.5,
}

const NumberCard = ({ number, text, width = "70%" }) => (
  <Box background='#EEEFFA' borderTop='4px solid #004AD9' p='35px'>
    <Text
      style={numberStyle}
      fontSize={98}
      fontWeight={900}
      letterSpacing='0.1em'
      lineHeight='123%'
    >
      {numeral(number).format("00")}
    </Text>
    <Text
      color='#565656'
      fontSize={20}
      fontWeight={600}
      lineHeight='123%'
      maxWidth={width}
    >
      {text}
    </Text>
  </Box>
)

const Report = () => {
  const { country } = useParams()
  const [headerTheme, SetHeaderTheme] = React.useState("")
  const [report, setReport] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [inCart, setInCart] = React.useState(false)
  const [url, setUrl] = React.useState("")
  const toast = useToast()
  const history = useHistory()
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)

  React.useEffect(() => {
    const fetchReportdata = () => {
      setLoading(true)
      fetch(`${baseUrl}/reports/info/${country}`)
        .then(res => res.json())
        .then(resJson => {
          setReport(resJson)
          setLoading(false)
        })
    }

    fetchReportdata()
  }, [country])

  React.useEffect(() => {
    // const fetchReportdata = () => {
    //   // setLoading(true)
    //   fetch(`${baseUrl}/reports/info/${country}`)
    //     .then(res => res.json())
    //     .then(resJson => {
    //       setReport(resJson)
    //       setLoading(false)
    //     })
    // }

    // fetchReportdata()

    const inCart = cartItems.find(item => item.Country === report?.Country)
    setInCart(Boolean(inCart))

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 60) {
        SetHeaderTheme("blue")
      } else if (currentScrollY === 0) {
        SetHeaderTheme("")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    setUrl(window.location.href)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [cartItems, report, country])

  const scrollTo = section => {
    history.push({
      pathname: "/",
      state: {
        section,
      },
    })
  }

  const gotoHome = () => {
    history.push("/")
    window.scroll(0, 0)
  }

  const addItemToCart = () => {
    dispatch(addToCart(report)).then(({ count }) => {
      displayToast(count)
    })
  }

  const displayToast = countArg => {
    return toast({
      position: "bottom-left",
      render: () => (
        <Box
          color='#FFFFFF'
          w={["96vw", "284px"]}
          p='22px'
          background='#00BB8D'
        >
          <Text fontSize={16} fontWeight={600} mb='12px' lineHeight='150%'>
            {report.Report_name} has been added to cart
          </Text>
          <Button
            onClick={() => dispatch(onOpen())}
            borderRadius={0}
            border='1px solid #FFFFFF'
            background='transparent'
            h='45px'
            w={["100%", "166px"]}
            _focus=''
            _hover=''
          >
            View Cart ({countArg})
          </Button>
        </Box>
      ),
    })
  }

  const data = {
    title: "Dive deeper into trade data & opportunities within Africa",
    description: `Gain insight into top commodities that ${report?.Country} trades within Africa and its recommended trading partners under AfCFTA via`,
    image: report?.Report_banner,
    url,
  }

  return (
    <Box minHeight='200vh'>
      <GoToTop />
      <Shareable data={data} />
      <Header
        theme={headerTheme}
        active={"reports"}
        logoAction={gotoHome}
        scrollTo={scrollTo}
      />
      <Flex
        padding={["125px 5% 51px", "185px 5% 51px"]}
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        style={backgroundStyle}
        backgroundSize='cover'
        position='relative'
      >
        {loading ? (
          <CardSkeleton />
        ) : (
          <>
            <Image
              src={report?.Report_cover_images_svg?.no_shadow}
              maxWidth='75%'
            />
            {report?.Report_price && (
              <Button
                _focus=''
                _hover=''
                color='#1729D2'
                background='#ffffff'
                width='218px'
                height='64px'
                marginTop='58px'
                fontFamily='Gilroy, sans-serif'
                fontSize={16}
                fontWeight={700}
                borderRadius={0}
                onClick={inCart ? null : () => addItemToCart()}
              >
                {inCart ? "Added to Cart" : `Add to Cart`}
                {/* {inCart ? "In cart" : `Buy now for $${report?.Report_price}`} */}
              </Button>
            )}
            <Flex mt='32px' justifyContent='center' flexWrap='wrap'>
              <Text
                color='#FFFFFF'
                fontSize={16}
                fontWeight={600}
                width={["100%", "auto"]}
                textAlign='center'
              >
                You can view a free sample
              </Text>
              {report && (
                <Link
                  href={report?.Report_preview}
                  textDecoration='none'
                  isExternal
                >
                  <Text
                    ml={["0", "8px"]}
                    mt={["20px", "0"]}
                    pb='3px'
                    borderBottom='1px solid #FFFFFF'
                    cursor='pointer'
                    color='#FFFFFF'
                    fontSize={16}
                    fontWeight={600}
                  >
                    Preview Report
                  </Text>
                </Link>
              )}
            </Flex>
          </>
        )}
        <VStack
          position='absolute'
          spacing='22px'
          right={["50px", "50px", "50px", "135px"]}
          bottom='50px'
          display={["none", "flex"]}
        >
          <SocialShares data={data} />
        </VStack>
        <HStack spacing='22px' display={["flex", "none"]} mt='68px'>
          <SocialShares data={data} />
        </HStack>
      </Flex>
      <Box
        padding={["99px 5%", "99px 8%"]}
        justifyContent='center'
        alignItems='center'
      >
        <Text
          color='#1629D3'
          fontSize={[12, 14]}
          fontWeight={700}
          letterSpacing='0.3em'
          textAlign='center'
        >
          SIX MODULES
        </Text>
        <Text
          color='#2C2C2C'
          fontSize={[32, 40]}
          fontWeight={700}
          textAlign='center'
          mb='60px'
        >
          What’s inside the report?
        </Text>
        <Grid
          gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
          gridGap={["16px", "30px"]}
        >
          {report?.Report_table_of_content.map((item, index) => (
            <NumberCard
              key={index}
              number={index + 1}
              text={item}
              width={index === 4 ? "100%" : "70%"}
            />
          ))}
        </Grid>
      </Box>
      <Box padding={["78px 5% 34px", "78px 8% 34px"]} background='#F6F9FC'>
        <Flex
          justifyContent='space-between'
          flexDirection={["column", "row"]}
          alignItems={["flex-start", "center"]}
          pb='73px'
          borderBottom='1px solid rgba(130, 127, 152, 0.3)'
        >
          <Text
            maxWidth={["100%", "55%"]}
            color='#2C2C2C'
            fontSize={40}
            fontWeight={700}
            lineHeight='123%'
            mb={["35px", "0"]}
          >
            Get focused analysis of {report?.Country}’s trade data and
            opportunities
          </Text>
          {report?.Report_price && (
            <Button
              _focus=''
              _hover=''
              color='#FFFFFF'
              background='#004AD9'
              width='218px'
              height='64px'
              fontFamily='Gilroy, sans-serif'
              fontSize={16}
              fontWeight={700}
              borderRadius={0}
              onClick={() => dispatch(addToCart(report))}
            >
              Get the report now
              {/* Buy now for ${report?.Report_price} */}
            </Button>
          )}
        </Flex>
        <Footer scrollTo={scrollTo} />
      </Box>
    </Box>
  )
}

export default Report
