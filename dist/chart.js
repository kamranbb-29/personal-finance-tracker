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
                    borderWidth: 3,
                    borderColor: "#126b5f",
                    backgroundColor: "rgba(18, 107, 95, 0.12)",
                    pointBackgroundColor: "#315f9f",
                    pointBorderColor: "#ffffff",
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.35,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: "#617086",
                        boxWidth: 12,
                        boxHeight: 12,
                        padding: 18,
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        color: "rgba(197, 208, 220, 0.35)",
                    },
                    ticks: {
                        color: "#617086",
                    },
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(197, 208, 220, 0.45)",
                    },
                    ticks: {
                        color: "#617086",
                    },
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
                    borderWidth: 3,
                    borderColor: "#ffffff",
                    backgroundColor: ["#126b5f", "#315f9f", "#b96a23", "#8b5cf6", "#d9466f", "#0f766e"],
                    hoverOffset: 12,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#617086",
                        boxWidth: 12,
                        boxHeight: 12,
                        padding: 18,
                    },
                },
            },
        },
    });
}
initchart();
export {};
//# sourceMappingURL=chart.js.map