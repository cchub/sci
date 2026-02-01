import React from "react";
import Helmet from "react-helmet";

const Shareable = (props) => {
  const { data } = props;

  const title = data.title;
  const description = data.description;
  const image = data.image;
  const url = data.url;

  React.useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.remove();
    }
  },[])

  return (
    <Helmet>
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OpenGraph tags */}
      <meta name="og:url" content={url} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image} />
      <meta name="og:type" content="website" />
      {/* Twitter Card tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
};

export default Shareable;
