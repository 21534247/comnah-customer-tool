const saveButton = document.getElementById("save-customer");

saveButton.addEventListener("click", function () {
    const customerName = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const preference = document.getElementById("customer-preference").value.trim();

    if (customerName === "" || phone === "") {
        alert("Please enter a customer name and phone number.");
        return;
    }
    const customer = {
        name: customerName,
        phone: phone,
        preference: preference
    };
    localStorage.setItem("customer", JSON.stringify(customer));
    displayCustomer(customer);
    alert(
        "Name: " + customerName +
        "\nPhone: " + phone +
        "\nDining preference: " + preference
    );
});
const savedCustomer = localStorage.getItem("customer");

if (savedCustomer) {
    const customer = JSON.parse(savedCustomer);

    document.getElementById("customer-name").value = customer.name;
    document.getElementById("customer-phone").value = customer.phone;
    document.getElementById("customer-preference").value = customer.preference;
}
function displayCustomer(customer) {
    const list = document.getElementById("customer-list");
    list.textContent = "";

    const item = document.createElement("li");
    item.textContent =
        customer.name + " | " +
        customer.phone + " | " +
        customer.preference;

    list.appendChild(item);
}

if (savedCustomer) {
    displayCustomer(JSON.parse(savedCustomer));
}