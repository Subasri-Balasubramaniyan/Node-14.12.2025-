const DataLoader = require("dataloader");

module.exports = () =>
  new DataLoader(async (ids) => {
    return ids.map(id => ({ id, text: "Hello" }));
  });
