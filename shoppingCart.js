document.addEventListener("DOMContentLoaded", function () {
    fetch("shoppingCart.json")
      .then((response) => response.json())
      .then((data) => {
        const cartItems = document.getElementById("cartItems");
        let total = 0;
  
        data.forEach((item) => {
          const tr = document.createElement("tr");
          const subtotal = item.price * item.quantity;
  
          tr.innerHTML = `
            <td><img src="${item.img}" alt="${item.productName}" class="product-image" /></td>
            <td>${item.productName}</td>
            <td>NT$${item.price}</td>
            <td>
              <div class="quantity">
                <button class="decrease">–</button>
                <span class="amount">${item.quantity}</span>
                <button class="increase">+</button>
              </div>
            </td>
            <td class="subtotal">NT$${subtotal}</td>
            <td><button>🗑️</button></td>
          `;
  
          cartItems.appendChild(tr);
          total += subtotal;
  
          const decreaseButton = tr.querySelector(".decrease");
          const increaseButton = tr.querySelector(".increase");
          const amountSpan = tr.querySelector(".amount");
          const subtotalCell = tr.querySelector(".subtotal");
  
          decreaseButton.addEventListener("click", function () {
            let currentAmount = parseInt(amountSpan.innerText, 10);
            if (currentAmount > 1) {
              currentAmount--;
              amountSpan.innerText = currentAmount;
              subtotalCell.innerText = `NT$${currentAmount * item.price}`;
              updateTotal();
            }
          });
  
          increaseButton.addEventListener("click", function () {
            let currentAmount = parseInt(amountSpan.innerText, 10);
            currentAmount++;
            amountSpan.innerText = currentAmount;
            subtotalCell.innerText = `NT$${currentAmount * item.price}`;
            updateTotal();
          });
        });
  
        document.querySelector(".total").innerText = `商品總額 NT$${total}`;
  
        function updateTotal() {
          const subtotals = document.querySelectorAll(".subtotal");
          let newTotal = 0;
          subtotals.forEach((cell) => {
            newTotal += parseInt(cell.innerText.replace("NT$", ""), 10);
          });
          document.querySelector(".total").innerText = `商品總額 NT$${newTotal}`;
        }
      })
      .catch((error) => {
        console.error("Error loading the JSON file:", error);
      });
  });
  

 
