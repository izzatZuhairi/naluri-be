const { Router } = require("express");
const fs = require("fs");
// const { default: BigNumber } = require("bignumber.js");

const routes = Router();

const calculationAsyncBigInt = async (accuracy) => {
  let i = 1n;
  let x = 3n * 10n ** (BigInt(accuracy) + 20n);
  let pi = x;
  await new Promise((res) => {
    while (x > 0) {
      x = (x * i) / ((i + 1n) * 4n);
      pi += x / (i + 2n);
      i += 2n;
    }
    res(x <= 0);
  });

  const retConst = 10n ** 20n;
  return pi / retConst;
};

routes.get("/calc-pi-async", async (req, res) => {
  let retainVal = req.query?.keepVal;
  fs.readFile("./current.json", "utf8", async (err, data) => {
    let t;
    if (!retainVal) {
      if (!data) {
        currAcc = 0;
      } else {
        // coz it starts with 0
        currAcc = data.length;
      }

      t = await calculationAsyncBigInt(currAcc);
    } else {
      t = BigInt(data);
    }

    fs.writeFile("./current.json", t.toString(), () => {});
    if (t.toString().length > 1) {
      res.send({ data: t.toString()[0] + "." + t.toString().substring(1) });
    } else {
      res.send({ data: t.toString() });
    }
  });
});

routes.get("/reset-pi", (req, res) => {
  fs.writeFile("./current.json", "", () => {});
  res.send("true");
});

module.exports = routes;

// const calculation = (accuracy) => {
//   let i = 1;
//   let x = 3;
//   let pi = x;
//   while (x > 0) {
//     x = BigNumber(x).times(i).div(BigNumber(i).plus(1).times(4));
//     pi = BigNumber(pi).plus(BigNumber(x).div(BigNumber(i).plus(2)));
//     i = BigNumber(i).plus(2);
//   }

//   return pi.toPrecision(accuracy);
// };

// routes.get("/calc-pi", (req, res) => {
//   let currData = "0";
//   let currAcc = 0;
//   fs.readFile("./current.json", "utf8", (err, data) => {
//     if (!data) {
//       currAcc = 1;
//     } else {
//       currAcc = data.split(".").join("").length + 1;
//     }

//     let t = calculation(currAcc);
//     currData = BigNumber(t);

//     if (data.length === currData.toString().length) {
//       t = calculation(currAcc + 1);
//       currData = BigNumber(t);
//     }

//     fs.writeFile("./current.json", currData.toString(), () => {});
//     res.send(currData + "");
//   });
// });

// const calculationAsync = async (accuracy) => {
//   // console.log(accuracy, "accuracy")
//   let i = 1;
//   let x = 3;
//   let pi = x;
//   await new Promise((res) => {
//     while (x > 0) {
//       x = BigNumber(x).times(i).div(BigNumber(i).plus(1).times(4));
//       pi = BigNumber(pi).plus(BigNumber(x).div(BigNumber(i).plus(2)));
//       i = BigNumber(i).plus(2);
//     }

//     res(x <= 0);
//   });

//   return pi.toPrecision(accuracy);
// };
