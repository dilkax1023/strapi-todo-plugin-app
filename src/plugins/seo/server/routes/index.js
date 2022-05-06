module.exports = [
  {
    method: "GET",
    path: "/content-types",
    handler: "seo.findContentTypes",
    config: {
      auth: false,
      policies: [],
    },
  },
];
