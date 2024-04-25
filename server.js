import app from "./src/app.js";
import { PORT } from "./src/config/index.js";
import dbConnection from "./src/config/dbConnection.js";

const startServer = async () => {
  try {
    await dbConnection();
    app.listen(PORT || 5000, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Error starting server", err);
  }
};
startServer();
