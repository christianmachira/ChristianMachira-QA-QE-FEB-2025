// const conn: string = "http://localhost:3000";
//cart as an array of CartItem objects
let cart = [];
// Fetch book data from API and display them
// async function fetchData(callBackFn: (books: Book[]) => void): Promise<void> {
//     try {
//         const response = await fetch("http://localhost:3000/library");
//         const data = await response.json();
//         callBackFn(data);
//     } catch (error) {
//         console.error("Error fetching data", error);
//     }
// }
async function fetchBooks(title = '', genre = '', sort = '') {
    try {
        const response = await fetch(`http://localhost:3000/library?title=${title}&genre=${genre}&sort=${sort}`);
        const data = await response.json();
        console.log("data fetched", data);
        displayBooks(data);
    }
    catch (error) {
        console.error("Error fetching data", error);
    }
}
// Display books on the page
function displayBooks(books) {
    const container = document.getElementById("book-container");
    if (!container) {
        console.error("Book conatainer element not found");
        return;
    }
    container.innerHTML = "";
    books.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <div class = "image">
            <img src="${book.image}"/>
            </div>
            <strong>${book.title}</strong><br>
            by ${book.author}<br>
            Genre: ${book.genre}<br>
            Year: ${book.year}<br>
            Pages: ${book.pages}<br>
            Price: $${book.price}<br>
            <button onclick="addToCart('${book.title}', ${book.price})">Add to Cart</button>
        `;
        container.appendChild(bookDiv);
    });
}
// Toggle cart visibility
function toggleCart() {
    const cartDiv = document.getElementById("cart-content");
    if (!cartDiv) {
        console.error("Cart content element not found");
        return;
    }
    cartDiv.style.display = cartDiv.style.display === "block" ? "none" : "block";
}
// Close cart modal
function closeModal() {
    const cartContent = document.getElementById("cart-content");
    if (cartContent) {
        cartContent.style.display = "none";
        return;
    }
}
// Add item to cart
function addToCart(title, price) {
    let item = cart.find(book => book.title === title);
    if (item) {
        item.quantity++;
    }
    else {
        cart.push({ title, price, quantity: 1 });
    }
    updateCart();
}
// Remove item from cart
function removeFromCart(title) {
    cart = cart.filter(book => book.title !== title);
    updateCart();
}
// Change quantity of an item in the cart
function changeQuantity(title, delta) {
    let item = cart.find(book => book.title === title);
    if (item) {
        item.quantity += delta;
        if (item.quantity < 1) {
            removeFromCart(title);
        }
    }
    updateCart();
}
// Update cart UI and total price
function updateCart() {
    const cartList = document.getElementById("cart-list");
    const totalElement = document.getElementById("total");
    if (!cartList || !totalElement) {
        console.error("Cart list or total element not found");
        return;
    }
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach(book => {
        total += book.quantity * book.price;
        cartList.innerHTML += `
            <div class="cart-item">
                ${book.title} (x${book.quantity})
                <button onclick="changeQuantity('${book.title}', 1)">+</button>
                <button onclick="changeQuantity('${book.title}', -1)">-</button>
                <button onclick="removeFromCart('${book.title}')">Remove</button>
            </div><hr>
        `;
    });
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}
// Search books by title
// function triggerSearch():void {
//     fetchData(books => {
//         const searchInput = document.getElementById("search") as HTMLInputElement;
//         if(!searchInput){
//             console.error("Search input element not found");
//             return;
//         }
//         const query = searchInput.value.toLowerCase();
//         const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
//         displayBooks(filteredBooks);
//     });
// }
// // Sort books by a specified property
// function sortBooksBy(property: keyof Book):void {
//     fetchData(books => {
//         const sortedBooks = [...books].sort((a, b) => {
//             if (typeof a[property] === 'string' && typeof b[property] === 'string') {
//                 return (a[property] as string).localeCompare(b[property] as string);
//             }
//             return (a[property] as number) - (b[property] as number);
//         });
//         displayBooks(sortedBooks);
//     });
// }
// Trigger search
function triggerSearch() {
    const searchInput = document.getElementById("search");
    if (!searchInput) {
        console.error("Search input element not found");
        return;
    }
    const query = searchInput.value.toLowerCase();
    fetchBooks(); // Call the backend with the search query
}
// Sort books
function sortBooksBy(property) {
    fetchBooks('', '', property); // Sort books directly from the backend
}
// Assign functions to window object
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQuantity = changeQuantity;
window.toggleCart = toggleCart;
window.closeModal = closeModal;
window.triggerSearch = triggerSearch;
window.sortBooksBy = sortBooksBy;
// Fetch and display books on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchBooks();
});
export {};
//# sourceMappingURL=index.js.map