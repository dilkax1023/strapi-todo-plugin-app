"use strict";

module.exports = ({ strapi }) => ({
  getContentTypes() {
    const contentTypes = strapi.contentTypes;
    const keys = Object.keys(contentTypes);
    let collectionTypes = [];
    let singleTypes = [];
    keys.forEach((name) => {
      if (name.includes("api::")) {
        const object = {
          uid: contentTypes[name].uid,
          kind: contentTypes[name].kind,
          globalId: contentTypes[name].globalId,
          attributes: contentTypes[name].attributes,
        };
        contentTypes[name].kind === "collectionType"
          ? collectionTypes.push(object)
          : singleTypes.push(object);
      }
    });
    return { collectionTypes, singleTypes } || null;
  },
});
