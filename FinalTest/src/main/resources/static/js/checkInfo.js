      const { createApp, ref, onMounted, computed } = Vue;
      createApp({
        setup() {
          const params = new URLSearchParams(window.location.search);
          const totalAmount = params.get("totalAmount");
          const finalAmount2 = params.get("finalAmount2");
          const api = ref("http://localhost:8080/api");
          const img = ref(
            "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D"
          );
          const userId = ref(2); // 使用者 ID
          //params.get("name2")取出前一頁傳來的name2並用name5接
          const products = ref([])

          const name5 = params.get("name2")
          const lastName2 = params.get("lastName")
          const email = params.get("email")
          const phone = params.get("phone")
          const zipCode = params.get("zipCode")
          const area = params.get("area")
          const city = params.get("city")
          
          const address = params.get("address")


           // 定義獲取資料的函式
           const getCart = async () => {
            const res = await axios.get(`${api.value}/cart/${userId.value}`);
            products.value = res.data
          };

          const orderData = {
            // console.log(zipCode, city, area);

             // 後端DTO參數 : 這頁對應的變數
            paymentAmount:finalAmount2,
            totalAmount:totalAmount,
            finalAmount:finalAmount2,
            address:`${zipCode} ${city} ${area} ${address} ` ,
            // address:`${zipCode.value} ${city.value} ${area.value}`,
            // code:, //coupon
            // percentageDiscount:,
            // amountDiscount:,
          }

          //缺優惠券
          //將收件者資料及購物車商品資料存進資料庫
          const addToOrders = async () => {
            console.log(orderData);
            
            try{
            const res = await axios.post(`${api.value}/orders/${userId.value}`,orderData)
            if(res.status === 200){
              alert('訂單已建立成功');
            }
          } catch (error){
            console.log('訂單建立失敗:',error);
            alert('訂單建立失敗請稍後再試');
          }
                   };

          
          onMounted(() => {
            getCart()
          })

          return {
            products,
            totalAmount,
            finalAmount2,
            img,
            email,
            name5,
            lastName2,
            phone,
            zipCode,
            area,
            city,
            addToOrders,
            address
          }
          }
          }).mount("#myContainer")



//右半區購買商品明細
// document.addEventListener('DOMContentLoaded', () => {
//   fetch('checkInfo.json')
//     .then(response => response.json())
//     .then(data => {
//       console.log('Data loaded:', data); // 確認 JSON 資料是否正確載入

//       const productList = document.getElementById('items-container');
//       let subtotal = 0;

//       data.items.forEach(product => {
//         const itemDiv = document.createElement('div');
//         itemDiv.classList.add('item');

//         const img = document.createElement('img');
//         img.src = product.image;
//         img.alt = product.name;

//         const detailsDiv = document.createElement('div');
//         detailsDiv.classList.add('item-details');

//         const nameDiv = document.createElement('div');
//         nameDiv.textContent = product.name;

//         const priceDiv = document.createElement('div');
//         priceDiv.classList.add('item-price');
//         priceDiv.textContent = `NT$${product.price}`;

//         const quantityDiv = document.createElement('div');
//         quantityDiv.textContent = `數量：${product.quantity}`;

//         detailsDiv.appendChild(nameDiv);
//         detailsDiv.appendChild(priceDiv);
//         detailsDiv.appendChild(quantityDiv);

//         itemDiv.appendChild(img);
//         itemDiv.appendChild(detailsDiv);

//         productList.appendChild(itemDiv);

//         subtotal += product.price * product.quantity;
//       });

//       document.getElementById('subtotal').textContent = `商品小計：NT$${data.subtotal}`;
//       document.getElementById('discount').textContent = `優惠碼折抵：NT$${data.discount}`;
//       document.getElementById('shipping').textContent = `運費：NT$${data.shipping}`;
//       document.getElementById('total').textContent = `付款總金額：NT$${data.total}`;
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// });


//收件人資料

// document.addEventListener('DOMContentLoaded', () => {
//   // 使用 fetch API 從 checkInfo.json 獲取資料
//   fetch('checkInfo.json')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       // 確保資料正確
//       console.log(data);

//       // 這裡可以用獲取到的資料做其他處理，例如更新 DOM
//       const { name, email, phone, address, delivery_method } = data;

//       // 更新 DOM 的範例
//       document.getElementById('name').textContent = name;
//       document.getElementById('email').textContent = email;
//       document.getElementById('phone').textContent = phone;
//       document.getElementById('address').textContent = `${address.zipcode} ${address.city}${address.district}${address.street}`;
//       document.getElementById('delivery_method').textContent = delivery_method;
//     })
//     .catch(error => {
//       console.error('Error fetching the JSON data:', error);
//     });
// });