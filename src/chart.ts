import { Legend, plugins } from "chart.js";
import { Transaction } from "./types";
declare var Chart: any;

console.log("hello");

let transac = localStorage.getItem("transactions");

let catexpend = localStorage.getItem("categoryamount");

let cat;

let catkey;
let catval;

if (catexpend) {
  cat = JSON.parse(catexpend);
  catkey = Object.keys(cat);
  catval = Object.values(cat);
}

let transactions: Transaction[] = transac ? JSON.parse(transac) : [];

let dates = transactions.map((t: any) => {
  return t.date;
});
let expenses = transactions.map((t: any) => {
  return t.amount;
});

const ctx = document.getElementById("myChart") as HTMLCanvasElement;

const piectx = document.querySelector("#piechart") as HTMLCanvasElement;

new Chart(ctx, {
  type: "line",
  data: {
    labels: dates,
    datasets: [
      {
        label: "Expenditure By Dates",
        data: expenses,
        borderWidth: 1,
        borderColor: "black",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

new Chart(piectx, {
  type: "pie",
  data: {
    labels: catkey,

    datasets: [
      {
        label: "Expenditure By Category",
        data: catval,
        borderWidth: 1,
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
        hoverOffset: 10,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
});
