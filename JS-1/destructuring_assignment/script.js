const user = {
    id: "USER-123456",
    name: {
        first: "Alice",
        last: "Liddell"
    },
    email: "alice@example.com",
    address: {
        shipping: {
            street: "123 Rabbit Hole",
            city: "Wonderland",
            state: "Fantasy",
            postalCode: "12345",
            country: "WL"
        },
        billing: {
            street: "456 Mad Hatter Lane",
            city: "Tea Party",
            state: "Fantasy",
            postalCode: "67890",
            country: "WL"
        }
    },
    payment: {
        total: "100.00",
        currency: "USD",
        details: {
            subtotal: "75.00",
            tax: "15.00",
            shipping: "10.00"
        },
        transactions: [
            {
                id: "TXN-123", amount: "50.00", description: "Magic Potion"
            },
            { id: "TXN-456", amount: "50.00", description: "Enchanted Sword" }
        ]
    }
};

const { id, name: { first, last }, email, address: { shipping: { street, city, state, postalCode, country } , billing: { street: street1, city: city1, state: state1, postalCode: postalCode1, country: country1 }}, payment: { total, currency, details: { subTotal, tax, shipping }, transactions}} = user
console.log

const personalInfo = document.getElementById("personal-info");
const shippingAddress = document.getElementById("shipping-address");
const billingAddress = document.getElementById("billing-address");
const paymentInfo = document.getElementById("transactions");
personalInfo.innerHTML= `<h2>Personal Info</h2><p>${id},${first},${last},${email}</p>`; 
shippingAddress.innerHTML = `<h2>Shopping Info</h2><p>shipping:${street},${city},${state},${postalCode},${country}</p>`
billingAddress.innerHTML = `<h2>Billing Information</h2><p>billing:${street1},${city1},${state1},${postalCode1},${country1}</p>`
paymentInfo.innerHTML = `<h2>Transactions</h2><ul>${transactions.map(transaction =>
    `<li>${transaction.amount}, ${transaction.description}</li>`
).join("")}</ul>`;


