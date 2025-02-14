const express = require("express")
const cors = require("cors")

const dotenv = require("dotenv")
const dbconnection = require("./database/database")
const router = require("./router/routerapi")
dotenv.config({ path: "./.env" })
const port = process.env.port || 4000


const app = express()
app.use(express.json())

app.use(cors())
dbconnection()
app.use("/", router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})