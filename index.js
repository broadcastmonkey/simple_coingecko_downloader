require("dotenv").config();
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

async function retrieveData(coinsArr) {
  let data = await CoinGeckoClient.simple.price({
    ids: coinsArr.map((x) => x.coin),
    vs_currencies: ["usd"],
  });
  console.log(data);
  let sum = 0;
  coinsArr.forEach((x) => {
    let price = data.data[x.coin].usd;
    if (price) sum += price * x.amount;
  });
  console.log(`total=${sum}`);
}

const coins = process.env.COINS.split(",");
const amounts = process.env.AMOUNT.split(",");
let arr = [];
if (coins.length === amounts.length)
  for (var i = 0; i < coins.length; i++)
    arr.push({ coin: coins[i], amount: amounts[i] });
retrieveData(arr);
