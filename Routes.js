const { default: BigNumber } = require("bignumber.js");
const { Router } = require("express");
const fs = require("fs");

const routes = Router();

const calculation = (accuracy) => {
  let i = 1;
  let x = 3;
  let pi = x;
  while (x > 0) {
    x = BigNumber(x).times(i).div(BigNumber(i).plus(1).times(4));
    pi = BigNumber(pi).plus(BigNumber(x).div(BigNumber(i).plus(2)));
    i = BigNumber(i).plus(2);
  }

  return pi.toPrecision(accuracy);
};

routes.get("/calc-pi", (req, res) => {
  let currData = "0";
  let currAcc = 0;
  fs.readFile("./current.json", "utf8", (err, data) => {
    if (!data) {
      currAcc = 1;
    } else {
      currAcc = data.split(".").join("").length + 1;
    }

    let t = calculation(currAcc)
    currData = BigNumber(t)

    if (data.length === currData.toString().length) {
      t = calculation(currAcc + 1)
      currData = BigNumber(t)
    }

    // the current flow will halt at accuracy = 24 since any calculation after that 
    // the bignumber value just return 0

    fs.writeFile("./current.json", currData.toString(), () => { });
    res.send(currData + "");
  });
});

const calculationAsync = async (accuracy) => {
  console.log(accuracy, "accuracy")
  let i = 1;
  let x = 3;
  let pi = x;
  await new Promise(res => {
    while (x > 0) {
      x = BigNumber(x).times(i).div(BigNumber(i).plus(1).times(4));
      pi = BigNumber(pi).plus(BigNumber(x).div(BigNumber(i).plus(2)));
      i = BigNumber(i).plus(2);
    }

    res(x <= 0)
  })

  return pi.toPrecision(accuracy);
};

routes.get("/calc-pi-async", async (req, res) => {
  let currData = "0";
  let currAcc = 0;
  fs.readFile("./current.json", "utf8", async (err, data) => {
    if (!data) {
      currAcc = 1;
    } else {
      currAcc = data.split(".").join("").length + 1;
    }

    let t = await calculationAsync(currAcc)
    currData = BigNumber(t)

    if (data.length === currData.toString().length) {
      t = await calculationAsync(currAcc + 1)
      currData = BigNumber(t)
    }

    fs.writeFile("./current.json", currData.toString(), () => { });
    res.send(currData.toString());
  });
});

routes.get("/reset-pi", (req, res) => {
  let resetVal = BigNumber(calculation(1)).toString();
  fs.writeFile("./current.json", "", () => { });
  res.send("true");
});

module.exports = routes;
