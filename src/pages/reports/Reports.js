import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Box, Flex, Text, Image, Button, VStack, Grid } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { baseUrl } from "../../utils/url";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import GoToTop from "../../components/goToTop/GoToTop";

import background_image from "../../assets/hero-bg.svg";
import {
  PrimarySkeleton,
  SecondarySkeleton,
} from "../../components/skeleton/ReportSkeleton";

const backgroundStyle = {
  backgroundImage: `url(${background_image})`,
};

const CoverCard = ({
  report: {
    Report_cover_images_svg: { no_shadow },
    Report_name,
    Available,
    Country,
  },
}) => (
  <Box pr="30px">
    <Image src={no_shadow} maxWidth="70%" />
    <Text
      color="#2C2C2C"
      fontSize={24}
      fontWeight={700}
      maxWidth={"220px"}
      lineHeight="123%"
      mt="41px"
    >
      {Report_name}
    </Text>
    {Available ? (
      <Link to={`/report/${Country.toLowerCase()}`}>
        <Button
          _focus=""
          _hover=""
          color="#004AD9"
          height="34px"
          mt="18px"
          padding={0}
          fontFamily="Gilroy, sans-serif"
          fontSize={16}
          fontWeight={700}
          borderRadius={0}
          letterSpacing="0.3em"
          variant="ghost"
          rightIcon={<ArrowForwardIcon />}
        >
          VIEW REPORT
        </Button>
      </Link>
    ) : (
      <Flex
        justifyContent="center"
        alignItems="center"
        background="rgba(22, 41, 211, 0.15)"
        height="34px"
        width="150px"
        mt="18px"
      >
        <Text
          color="#1629D3"
          fontSize={12}
          fontWeight={700}
          letterSpacing="0.3em"
        >
          COMING SOON
        </Text>
      </Flex>
    )}
  </Box>
);

const Reports = () => {
  const [headerTheme, SetHeaderTheme] = React.useState("");
  const [reports, setReports] = React.useState([]);
  const [recentReport, setRecentReport] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    getReports();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        SetHeaderTheme("blue");
      } else if (currentScrollY === 0) {
        SetHeaderTheme("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (section) => {
    history.push({
      pathname: "/",
      state: {
        section,
      },
    });
  };

  const gotoHome = () => {
    history.push("/");
    window.scroll(0, 0);
  };

  const getReports = () => {
    setLoading(true);
    fetch(`${baseUrl}/reports/info`)
      .then((res) => res.json())
      .then((resJson) => {
        const recent = resJson
          .filter((items) => items.Available)
          .reduce(function (prev, current) {
            return prev.Reports_index > current.Reports_index ? prev : current;
          });
        setRecentReport(recent);
        setReports(resJson);
        setTimeout(() => setLoading(false), 500);
      });
  };

  return (
    <Box>
      <GoToTop />
      <Header
        theme={headerTheme}
        active={"reports"}
        logoAction={gotoHome}
        scrollTo={scrollTo}
      />
      <Flex
        padding={["178px 5% 100px", "255px 5% 100px"]}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        style={backgroundStyle}
        backgroundSize="cover"
      >
        <Text
          color="#FFFFFF"
          fontSize={[12, 14]}
          fontWeight={700}
          letterSpacing="0.3em"
          mb="14px"
        >
          TRADE OPPORTUNITY REPORTS
        </Text>
        <Text
          color="#FFFFFF"
          fontSize={[32, 48]}
          fontWeight={700}
          textAlign="center"
        >
          Dive deeper <Box as="br" display={["block", "none"]} />
          into trade data{" "}
        </Text>
      </Flex>

      {loading ? (
        <PrimarySkeleton />
      ) : (
        <Flex
          padding="87px 5% 114px"
          justifyContent="center"
          alignItems="center"
          flexDirection={["column", "row"]}
        >
          <Image
            src={recentReport?.Report_cover_images_svg?.shadow}
            maxWidth="70%"
          />
          <Box maxWidth="440px" ml={["0", "0", "0", "67px"]} mt={["40px", "0"]}>
            <Text
              color="#1627B5"
              fontSize={[12, 14]}
              fontWeight={700}
              letterSpacing="0.3em"
              mb="16px"
              textAlign={["center", "left"]}
            >
              RECENT RELEASE
            </Text>
            <Text
              color="#161616"
              fontSize={[32, 42]}
              fontWeight={700}
              lineHeight="106%"
              mb="16px"
              textAlign={["center", "left"]}
            >
              {recentReport?.Country} Trade{" "}
              <Box as="br" display={["block", "none"]} />
              Opportunity Report
            </Text>
            <Text
              color="#161616"
              fontSize={18}
              mb="26px"
              textAlign={["center", "left"]}
            >
              {recentReport?.Report_description}
            </Text>
            <Flex justifyContent={["center", "flex-start"]}>
              <Link to={`/report/${recentReport?.Country?.toLowerCase()}`}>
                <Button
                  _focus=""
                  _hover=""
                  color="#ffffff"
                  background="#004AD9"
                  width="218px"
                  height="64px"
                  marginTop="16px"
                  marginBottom="10px"
                  fontFamily="Gilroy, sans-serif"
                  fontSize={16}
                  fontWeight={700}
                  borderRadius={0}
                >
                  Get this report
                </Button>
              </Link>
            </Flex>
          </Box>
        </Flex>
      )}
      <Box padding={["78px 5% 34px", "78px 8% 34px"]} background="#F6F9FC">
        <Flex justifyContent="space-between" mb="99px">
          <VStack spacing="14px" alignItems="flex-start">
            <Text
              color="#1629D3"
              fontSize={[12, 14]}
              fontWeight={700}
              letterSpacing="0.3em"
            >
              LIBRARY
            </Text>
            <Text
              color="#2C2C2C"
              fontSize={[32, 40]}
              fontWeight={700}
              lineHeight="106%"
            >
              Browse Reports
            </Text>
          </VStack>
        </Flex>

        {loading ? (
          <SecondarySkeleton len={3} />
        ) : (
          <Grid
            gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr 1fr"]}
            gridRowGap="84px"
            pb="103px"
            borderBottom="1px solid rgba(130, 127, 152, 0.3)"
          >
            {reports.map((report) => (
              <CoverCard report={report} key={report.Country} />
            ))}
          </Grid>
        )}

        <Footer scrollTo={scrollTo} />
      </Box>
    </Box>
  );
};

export default Reports;
