const mongoose = require("mongoose");

module.exports = () => {
  const URI = 'mongodb+srv://Lochin:ffAuYMLcOm5oOMHW@cluster0.mqu5j.mongodb.net/NodeJsCrud'

  mongoose.connect(URI, {
    useNewUrlParser: true, 
  });
  const db = mongoose.connection;

  db.on("open", () => {
    console.log("server running");
  });

  db.on("error", () => {
    console.log("server error");
  });
};