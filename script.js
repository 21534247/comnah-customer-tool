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
    if (!/^\+?[0-9 ()-]{8,20}$/.test(phone)) {
    alert("Enter a phone number with 8–20 characters using digits, spaces, brackets or hyphens.");
    return;
}

   const alreadyExists = customers.some(function (savedCustomer) {
    return savedCustomer.phone.replace(/\D/g, "") ===
           phone.replace(/\D/g, "");
});

    if (alreadyExists) {
        alert("A customer with this phone number already exists.");
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

    if (matches.length === 0) {
        const message = document.createElement("li");
        message.textContent = "No customers found.";
        list.appendChild(message);
        return;
    }

    matches.forEach(function (customer) {
        const item = document.createElement("li");

        item.textContent =
            customer.name + " | " +
            customer.phone + " | " +
            customer.preference + " ";

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit preference";

        editButton.addEventListener("click", function () {
            const updatedPreference = prompt(
                "Enter the new dining preference:",
                customer.preference
            );

            if (updatedPreference === null) {
                return;
            }

            customer.preference = updatedPreference.trim();

            localStorage.setItem(
                "customers",
                JSON.stringify(customers)
            );

            displayCustomer();
        });

        item.appendChild(editButton);
        list.appendChild(item);
    });
}

displayCustomer();

document.getElementById("customer-search")
    .addEventListener("input", function () {
        displayCustomer();
    });