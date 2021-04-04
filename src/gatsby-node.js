const { createRemoteFileNode } = require("gatsby-source-filesystem");
const axios = require("axios");
const path = require("path");

//Api request and get characters
const getLink = (endpoint) =>
  axios.get(`https://www.breakingbadapi.com/api/${endpoint}`);
const getAllCharacter = async () => {
  var data = await getLink("characters").then((res) => {
    return res.data;
  });
  return data;
};

//Source Nodes and Node Creation
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const putImageandContentTogether = (imageObject, character) => {
    const content = {
      name: character.name,
      nickname: character.nickname,
      status: character.status,
      birthday: character.birthday,
      occupation: character.occupation,
      portrayed: character.portrayed,
      category: character.category,
      appearance: character.appearance,
      better_call_saul_appearance: character.better_call_saul_appearance,
    };
    const nodeId = createNodeId(character.char_id);
    const nodeContent = JSON.stringify(character);
    const nodeContentDigest = createContentDigest(nodeContent);
    const nodeData = {
      ...imageObject,
      ...content,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: "Character",
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    };
    return nodeData;
  };

  const makeImageObejectFromUrl = (imageUrl) => {
    const lastIndexOfSlash = imageUrl.lastIndexOf("/");
    const id = imageUrl.slice(lastIndexOfSlash + 1, imageUrl.lastIndexOf("."));
    return { id, image: id, imageUrl };
  };

  const { createNode } = actions;
  const allCharacter = await getAllCharacter();

  allCharacter.forEach((character) => {
    const imgObj = makeImageObejectFromUrl(character.img);
    const nodeData = putImageandContentTogether(imgObj, character);
    createNode(nodeData);
  });
};

exports.onCreateNode = async ({
  node,
  actions,
  store,
  getCache,
  createNodeId,
}) => {
  if (node.internal.type == "Character") {
    const { createNode } = actions;
    const fileNode = await createRemoteFileNode({
      url: node.imageUrl,
      parentNodeId: node.id,
      store,
      getCache,
      createNode,
      createNodeId,
    });
    if (fileNode) {
      node.image___NODE = fileNode.id;
    }
  }
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  createPage({
    path: "/characters",
    component: path.resolve("./src/templates/Main.js"),
  });
};
