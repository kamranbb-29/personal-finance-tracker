let totalTransactions = document.querySelector("#totalTransactions");
let old = document.querySelector("#oldfirst");
let latest = document.querySelector("#newfirst");
let searched = document.querySelector("#searchbar");
let mostexpensive = document.querySelector("#mostexpensive");
let leastexpensive = document.querySelector("#leastexpensive");
let All = localStorage.getItem("transactions");
if (All) {
    let maintransac = JSON.parse(All);
    totalTransactions.innerHTML = maintransac
        .map((t) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`)
        .join("\n");
}
old.addEventListener("click", (event) => {
    if (All) {
        let maintransac = JSON.parse(All);
        totalTransactions.innerHTML = maintransac
            .map((t) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`)
            .join("\n");
    }
});
function render() {
    if (All) {
        let maintran = JSON.parse(All);
        let maintransac = maintran.reverse();
        totalTransactions.innerHTML = maintransac
            .map((t) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`)
            .join("\n");
    }
}
latest.addEventListener("click", (event) => {
    render();
});
if (All) {
    searched.addEventListener("input", () => {
        let maintransac = JSON.parse(All);
        let query = searched.value.toLowerCase();
        let results = maintransac.filter((t) => {
            return (t.category.toLowerCase().includes(query) ||
                t.date.includes(query) ||
                t.amount.toString().includes(query));
        });
        totalTransactions.innerHTML = results
            .map((t) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`)
            .join("\n");
    });
    render();
}
if (All) {
    mostexpensive.addEventListener("click", () => {
        let maintransac = JSON.parse(All);
        let results = maintransac.sort((a, b) => {
            return b.amount - a.amount;
        });
        totalTransactions.innerHTML = results
            .map((t) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`)
            .join("\n");
    });
    leastexpensive.addEventListener("click", () => {
        let maintransac = JSON.parse(All);
        let results = maintransac.sort((a, b) => {
            return a.amount - b.amount;
        });
        totalTransactions.innerHTML = results
            .map((t) => `<li> ${t.amount} ${t.category} ${t.date} </li> 
    <br/>`)
            .join("\n");
    });
}
export {};
