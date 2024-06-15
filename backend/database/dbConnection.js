import mongoose from "mongoose";
// import colors from "colors"

export const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To Mongodb Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};
