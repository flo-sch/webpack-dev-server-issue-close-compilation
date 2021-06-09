const config = {
  app: {
    enableSW: ['production'].includes(process.env.NODE_ENV),
    baseUrl: process.env.APP_BASE_URL
  }
  // add whatever you need in there
};

export default config;
