document.getElementById("add_button").addEventListener("click", addCard);

let companyName;
let symbol;
let previousClose;
let currentPrice;
let percentage;
let runningText = "";

fetch(
  "https://cloud.iexapis.com/v1/stock/market/batch?types=news&symbols=dow,&token=pk_93c31736e1884c4d9585a581f9a431d6"
)
  .then((news) => news.json())
  .then((data) => {
    data.DOW.news.forEach((item) => {
      runningText += item.headline;
    });
    document.getElementById("scroll-text").innerHTML = runningText;
  });

function getData() {
  const beginURL = "https://cloud.iexapis.com/stable/stock/";
  const endURL = "/quote?token=pk_93c31736e1884c4d9585a581f9a431d6";
  const input = document.getElementById("stock_symbol").value;
  const stock = input.toLowerCase();

  const apiURL = beginURL + stock + endURL;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      symbol = data.symbol;
      companyName = data.companyName;
      previousClose = data.previousClose;
      currentPrice = data.iexRealtimePrice;

      let card = document.createElement("div");
      card.id = "card";
      card.className = "card";
      card.style.width = "14rem";
      card.style.height = "auto";
      document.getElementById("results").append(card);

      let cardBody = document.createElement("div");
      cardBody.className = "card-body";
      card.append(cardBody);

      let companyNameTag = document.createElement("h5");
      companyNameTag.className = "card-title text-center";
      companyNameTag.innerHTML = companyName;
      cardBody.append(companyNameTag);

      let stockSymbol = document.createElement("h5");
      stockSymbol.className = "card-title text-center";
      stockSymbol.innerHTML = symbol;
      cardBody.append(stockSymbol);

      let currentPriceTag = document.createElement("h5");
      currentPriceTag.className = "card-title text-center";
      currentPriceTag.innerHTML = "$" + currentPrice;
      currentPriceTag.style.color = "orange";
      cardBody.append(currentPriceTag);

      percentage = (
        ((currentPrice - previousClose) / previousClose) *
        100
      ).toFixed(2);

      let percentageTag = document.createElement("h5");
      percentageTag.className = "card-title text-center";
      percentageTag.innerHTML = percentage + "%";
      cardBody.append(percentageTag);

      percentageTag.style.color = percentage > 0 ? "green" : "red";

      //create chart.js canvas
      //<canvas id="mychart" width="400" height="400"></canvas>
      //setAttribute  or      .width =
      let theChart = document.createElement("canvas");
      theChart.style.width = "400";
      theChart.style.height = "400";
      cardBody.append(theChart);
      let cardChart = theChart.getContext("2d");
      var myChart = new Chart(cardChart, {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });

      //button logo
      let addToFav = document.createElement("input");
      addToFav.type = "image";
      addToFav.id = "addFav";
      addToFav.className = "text-center";
      addToFav;
      addToFav.src = "logosmall.png";
      cardBody.append(addToFav);
    });

  document.forms["form"].reset();
}
function addCard() {
  getData();
}
