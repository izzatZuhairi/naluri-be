const { default: BigNumber } = require("bignumber.js");
const { Router } = require("express")
const fs = require("fs")

const routes = Router();

// routes.use((req, res, next) => {
//     next();
// })
const calculation = (currentValue) => {
    // let i = 1n;
    // let x = 3n * (10n **(BigInt(10) + 20n));
    // let pi = x;
    // while (x > 0) {
    //         x = x * i / ((i + 1n) * 4n);
    //         pi += x / (i + 2n);
    //         i += 2n;
    // }
    // // console.log(pi / (10n ** 20n))
    // console.log((BigInt(1) + 20n))
    // console.log(pi, "????")

    let i = 1;
    let x = BigNumber(3).times(BigNumber(10).exponentiatedBy(BigNumber(100)))
    let pi = x;
    while (x > 0) {
        x = BigNumber(x).times(i).div((BigNumber(i).plus(1)).times(4))
        pi = BigNumber(pi).plus(BigNumber(x).div((BigNumber(i).plus(2))))
        i = BigNumber(i).plus(2)
    }

    // pi = BigNumber(pi).toFixed(4)
    // pi = BigNumber(pi).div(BigNumber(10).exponentiatedBy(BigNumber(100)))

    console.log(pi.toPrecision(100), "pi values")
}

routes.get('/hello-world',  (req, res) => {
    let currData = "0";
    fs.readFile("./current.json", "utf8", (err, data) => {
        currData = data;
    })

    calculation("0");

    if(currData === "0") {
        currData = "3"
    }

    fs.writeFile("./current.json", currData, () => {})
    res.send(currData)
})

module.exports = routes;