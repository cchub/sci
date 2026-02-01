import React from "react";
import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
} from "@chakra-ui/react";

import Cart from "./Cart";

import { useSelector, useDispatch } from "react-redux";
import { onOpen, onClose } from "../../redux/actions/cart.action";

const CartContainer = ({ setCartIsOpen }) => {
  const { count, isOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (count === 0) dispatch(onClose());
    setCartIsOpen(isOpen)
  }, [count, dispatch, isOpen, setCartIsOpen]);

  const renderCartLabel = (tag) => {
    let isMobile = tag === "mobile";
    return (
      <>
        {count > 0 && (
          <Flex
            height="45px"
            alignItems="center"
            marginLeft="49px"
            onClick={() => {
              dispatch(onOpen());
              setIsMobile(isMobile);
            }}
            cursor="pointer"
            display={isMobile ? ["flex", "none"] : ["none", "flex"]}
          >
            <Text mr="8px" fontWeight={500}>
              Cart
            </Text>
            <Flex
              backgroundColor="#F3821A"
              borderRadius="50%"
              alignItems="center"
              justifyContent="center"
              width={["24px", "16px"]}
              height={["24px", "16px"]}
              fontSize={["16px", "10px"]}
              fontWeight={700}
              color="#FFFFFF"
            >
              {count}
            </Flex>
          </Flex>
        )}
      </>
    );
  };

  return (
    <>
      {renderCartLabel("mobile")}
      {renderCartLabel("desktop")}
      <Modal isOpen={isOpen && !isMobile} onClose={() => dispatch(onClose())}>
        <ModalOverlay />
        <ModalContent
          rounded={false}
          maxWidth="715px"
          mb={["0", "auto"]}
          mt={["0", "auto"]}
          height={["100vh", "auto"]}
        >
          <Cart />
        </ModalContent>
      </Modal>
      {isOpen && isMobile && (
        <Box position="fixed" top="60px" left={0} right={0} bottom={0} background="#FFFFFF" zIndex={1} className="overscroll">
          <Cart />
        </Box>
      )}
    </>
  );
};

export default CartContainer;
