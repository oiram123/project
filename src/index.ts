import express, { Request, Response } from "express"
import { json } from "body-parser"
import mainRoute from "./routes/mainRoute"
import helmet from "helmet"
import hpp from "hpp"
//@ts-ignore
import { xss } from "express-xss-sanitizer"
import cors from "cors"

const app = express()
const port = 5000

//for security
app.use(helmet())
app.use(hpp())
app.use(xss())
app.use(cors())

// For accepting post form data
app.use(json())

app.use("/main", mainRoute)

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Horizont Labs Backend Coding Task :)")
})

app.listen(port, () => {
  console.log("Server is running on port: ", port)
})
