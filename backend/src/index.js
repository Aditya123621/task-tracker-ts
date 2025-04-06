import { connectDB } from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5001, function (err) {
      if (err) {
        console.log(err, "Here I have console log the error");
      }
      console.log("Database connected");
      console.log("Server running on, ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("There was problem saar", err);
  });
