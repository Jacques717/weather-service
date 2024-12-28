import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

//routes

app.get("/", (req: Request, resp: Response) => {
    
    resp.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})