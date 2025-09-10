const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");
main()
  .then((res) => {
    console.log("connect to database");
  })
  .catch((err) => {
    console.log(err);
  });

listing;
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
  await listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "68b85aa83adb13b18ae56b59",
  }));
  await listing.insertMany(initdata.data);
  console.log("data was intialise");
};
initDB();
