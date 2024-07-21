let total = 0;
let subtotal = 0;
const transactionHistory = [];
let dailyTotal = 0;

function addItem(name, price) {
    const receiptItems = document.getElementById('receipt-items');
    const newItem = document.createElement('tr');
    newItem.innerHTML = `<td>${name}</td><td>1</td><td>₹${price.toFixed(2)}</td>`;
    receiptItems.appendChild(newItem);

    subtotal += price;
    total = subtotal; // You can add discount and tax calculations here
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function printReceipt() {
    const receiptItems = document.getElementById('receipt-items').innerHTML;
    const totalPrice = document.getElementById('total').textContent;
    const transaction = {
        items: receiptItems,
        total: totalPrice,
        date: new Date().toLocaleString()
    };
    transactionHistory.push(transaction);
    dailyTotal += parseFloat(totalPrice);
    updateTransactionHistory();

    const receiptContent = `
        <div>
            <p><strong>RAGA PVT LTD</strong></p>
            <p>S USMAN ROAD, T. NAGAR,<br>CHENNAI, TAMIL NADU.<br>PHONE: 044 25836222<br>GSTIN: 33AAAGP0685F1ZH</p>
            <p>Retail Invoice</p>
            <p>Date: ${transaction.date}</p>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Amt</th>
                    </tr>
                </thead>
                <tbody>
                    ${transaction.items}
                </tbody>
            </table>
            <p>Sub Total: ₹${subtotal.toFixed(2)}</p>
            <p>Discount: ₹0.00</p>
            <p>Tax: ₹0.00</p>
            <p><strong>TOTAL: ₹${totalPrice}</strong></p>
        </div>
    `;

    const newWindow = window.open('', '', 'width=300,height=400');
    newWindow.document.write('<html><head><title>Receipt</title></head><body>');
    newWindow.document.write(receiptContent);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();

    // Clear receipt after printing
    document.getElementById('receipt-items').innerHTML = '';
    document.getElementById('subtotal').textContent = '0.00';
    document.getElementById('total').textContent = '0.00';
    subtotal = 0;
    total = 0;
}

function updateTransactionHistory() {
    const historyList = document.getElementById('transaction-history');
    historyList.innerHTML = '';
    transactionHistory.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="transaction-details">
                <span><strong>Date:</strong> ${transaction.date}</span>
                <span><strong>Total:</strong> ₹${transaction.total}</span>
            </div>
            <div class="transaction-items"><strong>Items:</strong><ul>${transaction.items}</ul></div>
        `;
        historyList.appendChild(listItem);
    });
}

function showMenuPage() {
    document.getElementById('menu-page').style.display = 'block';
    document.getElementById('history-page').style.display = 'none';
}

function showHistoryPage() {
    document.getElementById('menu-page').style.display = 'none';
    document.getElementById('history-page').style.display = 'block';
}

// Function to calculate and display the daily total at 7 PM
function calculateDailyTotal() {
    let currentDate = new Date();
    if (currentDate.getHours() === 19) { // 7 PM
        alert(`Total transactions for today: ₹${dailyTotal.toFixed(2)}`);
        dailyTotal = 0; // Reset daily total for the next day
    }
}

// Set an interval to check the time every minute
setInterval(calculateDailyTotal, 60000);

// Initialize daily total check when the script is loaded
calculateDailyTotal();
