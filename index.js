const bodyParser = require("body-parser")
const { json } = require("body-parser")
const express = require("express")

const Routes = require("./Routes")

const app = express()

// app.get('/hello-world',  (req, res) => {
//     let currData = "0";
//     fs.
//     fs.readFile("./current.json", "utf8", (err, data) => {
//         currData = data;
//     })

//     if(currData === "0") {
//         currData = "3"
//     }

//     fs.writeFile("./current.json", currData, () => {})
//     res.send(currData)
// })
app.use("/api", Routes)

app.use(json())
app.use(bodyParser.urlencoded({ extended: false }));
const server = app.listen(4500, () => {
    const port = server.address().port;
    console.log("listening at port %s", port)
})