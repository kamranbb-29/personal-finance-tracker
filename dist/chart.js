const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}
let transactions = [];
let API_URL = "http://localhost:3000/expense";
async function getExpense() {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    transactions = data.expense;
}
async function initchart() {
    await getExpense();
    const dates = transactions.map((t) => t.date);
    const expenses = transactions.map((t) => t.amount);
    const ctx = document.getElementById("myChart");
    const piectx = document.querySelector("#piechart");
    const categoryTrans = transactions.reduce((totals, t) => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
        return totals;
    }, {});
    const categoryValues = Object.values(categoryTrans);
    const categoryLabels = Object.keys(categoryTrans);
    new Chart(ctx, {
        type: "line",
        data: {
            labels: dates.length ? dates : ["No expenses"],
            datasets: [
                {
                    label: "Expenditure By Dates",
                    data: expenses.length ? expenses : [0],
                    borderWidth: 1,
                    borderColor: "black",
                    tension: 0.25,
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
            labels: categoryLabels.length ? categoryLabels : ["No expenses"],
            datasets: [
                {
                    label: "Expenditure By Category",
                    data: categoryValues.length ? categoryValues : [1],
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
}
initchart();
export {};
//# sourceMappingURL=chart.js.map