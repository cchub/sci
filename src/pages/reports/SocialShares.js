import React from "react";
import { useToast } from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  TwitterCircleIcon,
  FacebookCircleIcon,
  LinkedInCircleIcon,
  LinkCircleIcon,
} from "../../components/Icons";

const SocialShares = ({ data }) => {
  const toast = useToast();

  const copiedToast = () => {
    return toast({
      position: "top-right",
      title: "Link copied",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      <TwitterShareButton url={data.url} title={data.description}>
        <TwitterCircleIcon />
      </TwitterShareButton>
      <FacebookShareButton url={data.url} title={data.description}>
        <FacebookCircleIcon />
      </FacebookShareButton>
      <LinkedinShareButton url={data.url} title={data.description}>
        <LinkedInCircleIcon />
      </LinkedinShareButton>
      <CopyToClipboard text={data.url} onCopy={() => copiedToast()}>
        <span style={{ cursor: "pointer" }}>
          <LinkCircleIcon />
        </span>
      </CopyToClipboard>
    </>
  );
};

export default SocialShares;
