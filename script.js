const customers =
    JSON.parse(localStorage.getItem("customers")) || [];
    customers.forEach(function (customer) {
    if (customer.type === "Casual") {
        customer.type = "Regular";
    }
});

localStorage.setItem("customers", JSON.stringify(customers));

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
    if (!/^\+?[0-9 ()-]{8,20}$/.test(phone) ||
    phone.replace(/\D/g, "").length < 8) {
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
    preference: preference,
    type: document.getElementById("customer-type").value,
    marketing: document.getElementById("customer-marketing").value
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

    const selectedType =
    document.getElementById("customer-type-filter").value;

const matches = customers.filter(function (customer) {
    const phoneSearch = search.replace(/\D/g, "");

    const matchesSearch =
        customer.name.toLowerCase().includes(search) ||
        (phoneSearch !== "" &&
            customer.phone.replace(/\D/g, "").includes(phoneSearch));

    const matchesType =
        selectedType === "All" ||
        (customer.type || "Unclassified") === selectedType;

    return matchesSearch && matchesType;
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
    customer.preference + " | " +
    (customer.type || "Unclassified") + " | " +
    "Marketing: " + (customer.marketing || "Not asked");

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
        const marketingSelect = document.createElement("select");
marketingSelect.setAttribute(
    "aria-label",
    "Marketing preference for " + customer.name
);

["Not asked", "Opted out", "Opted in"].forEach(function (choice) {
    const option = document.createElement("option");
    option.value = choice;
    option.textContent = "Marketing: " + choice;
    marketingSelect.appendChild(option);
});

marketingSelect.value = customer.marketing || "Not asked";

marketingSelect.addEventListener("change", function () {
    customer.marketing = marketingSelect.value;
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomer();
});

item.appendChild(marketingSelect);
        list.appendChild(item);
    });
}

displayCustomer();

document.getElementById("customer-search")
    .addEventListener("input", function () {
        displayCustomer();
    });
 document.getElementById("customer-type-filter")
    .addEventListener("change", function () {
        displayCustomer();
    });
    const bookingGuests = document.getElementById("booking-guests");
const bookingTime = document.getElementById("booking-time");
const bookingNotice = document.getElementById("booking-notice");

let warningShowing = false;

function checkBookingEnquiry() {
    const guests = Number(bookingGuests.value);
    const time = bookingTime.value;

    const largeGroup = Number.isInteger(guests) && guests >= 8;
    const lateBooking = time !== "" && time >= "20:00";

    const needsCall = largeGroup || lateBooking;

    if (needsCall) {
        bookingNotice.textContent =
            "Please call the restaurant for groups of 8 or more " +
            "or times from 8:00 PM. This does not confirm a booking.";

        if (!warningShowing) {
            alert(bookingNotice.textContent);
        }
    } else {
        bookingNotice.textContent =
            "Please contact the restaurant about large-group " +
            "or late bookings. This does not confirm a booking.";
    }

    warningShowing = needsCall;
}

bookingGuests.addEventListener("input", checkBookingEnquiry);
bookingTime.addEventListener("input", checkBookingEnquiry);