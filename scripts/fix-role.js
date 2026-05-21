const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://donhafiz:Wumbee568%40@ac-zoz7xfn-shard-00-00.x7aa4d4.mongodb.net:27017,ac-zoz7xfn-shard-00-01.x7aa4d4.mongodb.net:27017,ac-zoz7xfn-shard-00-02.x7aa4d4.mongodb.net:27017/ballotchain?ssl=true&replicaSet=atlas-qb3ldn-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

async function fix() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected");

  const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({}, { strict: false }), "users");
  const result = await User.updateOne(
    { email: "admin@ballotchain.com" },
    { $set: { role: "super_admin" } }
  );
  
  console.log("Updated:", result.modifiedCount, "user(s)");
  await mongoose.disconnect();
}

fix().catch(console.error);
