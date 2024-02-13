import express, { Request, Response } from "express";
import { json } from "body-parser";
import mainRoute from "./routes/mainRoute";
const app = express();
const port = 5000;

// For accepting post form data
app.use(json());

app.use("/main", mainRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
