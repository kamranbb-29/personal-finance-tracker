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
let transactions = transac ? JSON.parse(transac) : [];
let dates = transactions.map((t) => {
    return t.date;
});
let expenses = transactions.map((t) => {
    return t.amount;
});
const ctx = document.getElementById("myChart");
const piectx = document.querySelector("#piechart");
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
export {};
