import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

import useConfig from 'hooks/useConfig';

const Head = ({ description, image, lang, prerenderStatusCode, title, type }) => {
  const { app } = useConfig();
  const { pathname } = useLocation();

  const origin =
    typeof window !== 'undefined' && typeof window.location !== 'undefined'
      ? window.location.origin
      : app.baseUrl;
  const PAGE_URL = new URL(pathname, origin);
  const IMAGE_URL = image && image.url ? new URL(image.url, origin) : null;

  return (
    <Helmet htmlAttributes={{ lang }}>
      <link rel="canonical" content={PAGE_URL.href} />
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={PAGE_URL.href} />
      {/* <meta property="og:site_name" content="{SITE_NAME}" /> */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {IMAGE_URL && <meta property="og:image" content={IMAGE_URL.href} />}
      {image && image.width && <meta property="og:image:width" content={image.width} />}
      {image && image.height && <meta property="og:image:height" content={image.height} />}
      <meta name="twitter:card" content="summary" />
      {/* <meta name="twitter:site" content="@{TWITTER_USERNAME}" /> */}
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {IMAGE_URL && <meta property="twitter:image" content={IMAGE_URL.href} />}
      {image && image.alt && <meta property="twitter:image:alt" content={image.alt} />}
      {prerenderStatusCode && (
        <meta name="prerender-status-code" content={String(prerenderStatusCode)} />
      )}
    </Helmet>
  );
};

Head.propTypes = {
  /** Meta description of the current page */
  description: PropTypes.string,
  /** OpenGraph sharing image */
  image: PropTypes.shape({
    alt: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.integer,
    height: PropTypes.integer
  }),
  /** HTML lang attribute */
  lang: PropTypes.string,
  /** Status Code used by prerendering engines (e.g. Netlify) to catch client-side status and apply it as an HTTP status code */
  prerenderStatusCode: PropTypes.number,
  /** Meta title of the current page */
  title: PropTypes.string,
  /** OpenGraph document type */
  type: PropTypes.string
};

Head.defaultProps = {
  lang: 'en',
  type: 'website'
};

export default Head;
