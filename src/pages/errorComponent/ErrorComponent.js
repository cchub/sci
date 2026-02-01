import React, { Component } from "react";
import { Container, Flex, Box, Text, Image } from "@chakra-ui/react";

import maintainance_illustration from "../../assets/maintainance.svg";

export default class ErrorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Flex justifyContent="center" alignItems="center" flexDirection="column" minHeight="100vh">
            <Image src={maintainance_illustration} alt="maintainance illustration" mb="30px"/>
            <Box as="h3" fontSize={24} fontWeight={700} color="#2C2C2C" mb="10px">
              We are Temporarily Down
            </Box>
            <Text fontSize={18} color="#2C2C2C" textAlign="center" maxWidth={["100%", "400px"]}>
              Our website is currently down for a bit, due to maintenance but we
              expect to be back soon, thanks for your patience.
            </Text>
          </Flex>
        </Container>
      );
    }

    return this.props.children;
  }
}
