import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not defined");
    }

    await mongoose.connect(mongoUrl);
    console.log("Database Connected");
  } catch (error: any) {
    console.error("Database Connection Error: ", error.message || error);
    

    if (error.code === 18 || error.codeName === "AuthenticationFailed") {
      console.error("\n⚠️  MongoDB Authentication Failed!");
      console.error("   Possible causes:");
      console.error("   1. Incorrect username or password in MONGO_URL");
      console.error("   2. MongoDB user doesn't exist or has wrong credentials");
      console.error("   3. Password with special characters (!, @, #, etc.) needs URL encoding");
      console.error("   4. Database user doesn't have proper permissions");
      console.error("\n   Example: mongodb://user:password%21@localhost:27017/dbname");
      console.error("   Special characters: ! = %21, @ = %40, # = %23, $ = %24");
    } else if (error.message?.includes("ECONNREFUSED")) {
      console.error("\n⚠️  Cannot connect to MongoDB!");
      console.error("   Make sure MongoDB is running on localhost:27017");
    }
    
    throw error; 
  }
};

mongoose.connection.on("error", (error) => {
  console.error("Mongoose Connection Error: ", error);
});

export default databaseConnection;