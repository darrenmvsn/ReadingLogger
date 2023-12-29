const express = require("express")
const cors = require("cors")
const app = require("./routes")
const PORT = 3002 || process.env.PORT

const routes = express.Router();

routes.use(cors())
routes.use(express.json())
routes.use("/", app)

