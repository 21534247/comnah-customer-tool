const customers =
    JSON.parse(localStorage.getItem("customers")) || [];

const saveButton = document.getElementById("save-customer");

saveButton.addEventListener("click", function () {
    const customerName =
        document.getElementById("customer-name").value.trim();

    const phone =
        document.getElementById("customer-phone").value.trim();

    const preference =
        document.getElementById("customer-preference").value.trim();

    if (customerName === "" || phone === "") {
        alert("Please enter a customer name and phone number.");
        return;
    }

    const customer = {
        name: customerName,
        phone: phone,
        preference: preference
    };

    customers.push(customer);
    localStorage.setItem("customers", JSON.stringify(customers));

    displayCustomer();
    document.querySelector("form").reset();
    alert("Customer saved.");
});
function displayCustomer() {
    const list = document.getElementById("customer-list");
    list.textContent = "";

    const search = document.getElementById("customer-search")
        .value.trim().toLowerCase();

    const matches = customers.filter(function (customer) {
        return customer.name.toLowerCase().includes(search) ||
               customer.phone.includes(search);
    });

    matches.forEach(function (customer) {
        const item = document.createElement("li");

        item.textContent =
            customer.name + " | " +
            customer.phone + " | " +
            customer.preference;

        list.appendChild(item);
    });
}

displayCustomer();

document.getElementById("customer-search")
    .addEventListener("input", function () {
        displayCustomer();
    });