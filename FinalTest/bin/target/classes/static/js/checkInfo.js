<<<<<<< HEAD
      const { createApp, ref, onMounted, computed } = Vue;
=======
<<<<<<< HEAD
      const { createApp, ref, onMounted, computed, watch } = Vue;
=======
      const { createApp, ref, onMounted, computed } = Vue;
>>>>>>> df1674c5fef1625551261257122acc83d3e42279
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
      createApp({
        setup() {
          const params = new URLSearchParams(window.location.search);
          const totalAmount = params.get("totalAmount");
          const finalAmount2 = params.get("finalAmount2");
<<<<<<< HEAD
=======
<<<<<<< HEAD
          // const discount = params.get("discount");
=======
>>>>>>> df1674c5fef1625551261257122acc83d3e42279
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
          const api = ref("http://localhost:8080/api");
          const img = ref(
            "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D"
          );
<<<<<<< HEAD
=======
<<<<<<< HEAD
          const userId = ref(0); // 使用者 ID
          const products = ref([])
=======
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
          const userId = ref(2); // 使用者 ID
          //params.get("name2")取出前一頁傳來的name2並用name5接
          const products = ref([])

<<<<<<< HEAD
=======
>>>>>>> df1674c5fef1625551261257122acc83d3e42279
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
          const name5 = params.get("name2")
          const lastName2 = params.get("lastName")
          const email = params.get("email")
          const phone = params.get("phone")
          const zipCode = params.get("zipCode")
          const area = params.get("area")
          const city = params.get("city")
          
          const address = params.get("address")
<<<<<<< HEAD
=======
<<<<<<< HEAD
          const pay = ref(false)
          const form = ref("")
          const merchantTradeNo = ref("")
          const sendCheckoutForm = ref({})
          const isSubmit = ref(false)

          const getUserId = async () => {
            const res = await axios.get(`/users/userAllInfo`);
            userId.value = res.data.userId;
            console.log(userId.value);
            getCart();
          };
=======
>>>>>>> df1674c5fef1625551261257122acc83d3e42279
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5

          // 生成 UUID
          function generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const random = Math.random() * 16 | 0;
                const value = c === 'x' ? random : (random & 0x3 | 0x8);
                return value.toString(16);
            }).replace(/-/g, '').substring(0, 8);
          }

          // 使用示例
          const merchantNo = generateUUID();
          console.log(merchantNo);


           // 定義獲取資料的函式
           const getCart = async () => {
            const res = await axios.get(`${api.value}/cart/${userId.value}`);
            products.value = res.data
          };

          const orderData = {
            // 後端DTO參數 : 這頁對應的變數
            paymentAmount:finalAmount2,
            totalAmount:totalAmount,
            finalAmount:finalAmount2,
            address:`${zipCode} ${city} ${area} ${address} ` ,
            merchantNo:merchantNo
          }

          const paymentData = {
            total:finalAmount2,
            merchantNo:merchantNo
          }

          const getPayment = async () => {
            const res = await axios.post(`${api.value}/ECPAY/ecpayCheckout`,paymentData);
<<<<<<< HEAD
=======
<<<<<<< HEAD
            form.value = res.data
            const parser = new DOMParser()
            const doc = parser.parseFromString(form.value, 'text/html')
            const merchantTradeNoElement = doc.querySelector('input[name="MerchantTradeNo"]');
            if(merchantTradeNoElement) {
              merchantTradeNo.value = merchantTradeNoElement.value
              sendCheckoutForm.value = form.value
              isSubmit.value   = true
            }
            if(res.data) {
              pay.value = true
            }
        console.log(res.data);
        
          };

          watch(sendCheckoutForm, (newForm) => {
            if(newForm) {
              setTimeout(() => {
                const parser = new DOMParser()
                const doc = parser.parseFromString(newForm, 'text/html')
                const form = doc.getElementById('allPayAPIForm')
                if (form) {
                  document.body.appendChild(form)
                  form.submit()
                }
              }, 0)
            }
          })

=======
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
        console.log(res);
        
          };

<<<<<<< HEAD
=======
>>>>>>> df1674c5fef1625551261257122acc83d3e42279
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
          //缺優惠券
          //將收件者資料及購物車商品資料存進資料庫
          const addToOrders = async () => {
            console.log(orderData);
            
            try{
            const res = await axios.post(`${api.value}/orders/${userId.value}`,orderData)
<<<<<<< HEAD
         
=======
<<<<<<< HEAD
              
=======
         
>>>>>>> df1674c5fef1625551261257122acc83d3e42279
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
            if(res.status === 200){
              getPayment()

            //跳轉頁面並且帶著付款金額及marchantNo
          


            }
          } catch (error){
            console.log('訂單建立失敗:',error);
            alert('訂單建立失敗請稍後再試');
          }
                   };

          
          onMounted(() => {
<<<<<<< HEAD
            getCart()
            getPayment()
=======
<<<<<<< HEAD
            getUserId()
=======
            getCart()
            getPayment()
>>>>>>> df1674c5fef1625551261257122acc83d3e42279
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
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
<<<<<<< HEAD
            address
=======
<<<<<<< HEAD
            address,
            form,
            pay,
            merchantTradeNo,
            isSubmit
=======
            address
>>>>>>> df1674c5fef1625551261257122acc83d3e42279
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
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