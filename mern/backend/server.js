import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

// Allow requests from your React app's origin
const corsOptions = {
  origin: "http://3.110.224.8:5050", // Adjust if your React app is hosted elsewhere
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/record", records);

// Start the Express server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
