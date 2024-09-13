//右半區購買商品明細
document.addEventListener('DOMContentLoaded', () => {
    fetch('checkInfo.json')
      .then(response => response.json())
      .then(data => {
        console.log('Data loaded:', data); // 確認 JSON 資料是否正確載入
  
        const productList = document.getElementById('items-container');
        let subtotal = 0;
  
        data.items.forEach(product => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('item');
  
          const img = document.createElement('img');
          img.src = product.image;
          img.alt = product.name;
  
          const detailsDiv = document.createElement('div');
          detailsDiv.classList.add('item-details');
  
          const nameDiv = document.createElement('div');
          nameDiv.textContent = product.name;
  
          const priceDiv = document.createElement('div');
          priceDiv.classList.add('item-price');
          priceDiv.textContent = `NT$${product.price}`;
  
          const quantityDiv = document.createElement('div');
          quantityDiv.textContent = `數量：${product.quantity}`;
  
          detailsDiv.appendChild(nameDiv);
          detailsDiv.appendChild(priceDiv);
          detailsDiv.appendChild(quantityDiv);
  
          itemDiv.appendChild(img);
          itemDiv.appendChild(detailsDiv);
  
          productList.appendChild(itemDiv);
  
          subtotal += product.price * product.quantity;
        });
  
        document.getElementById('subtotal').textContent = `商品小計：NT$${data.subtotal}`;
        document.getElementById('discount').textContent = `優惠碼折抵：NT$${data.discount}`;
        document.getElementById('shipping').textContent = `運費：NT$${data.shipping}`;
        document.getElementById('total').textContent = `付款總金額：NT$${data.total}`;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  

  //收件人資料
  document.addEventListener('DOMContentLoaded', () => {
    // 使用 fetch API 從 checkInfo.json 獲取資料
    fetch('checkInfo.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // 確保資料正確
        console.log(data);
        
        // 這裡可以用獲取到的資料做其他處理，例如更新 DOM
        const { name, email, phone, address, delivery_method } = data;
  
        // 更新 DOM 的範例
        document.getElementById('name').textContent = name;
        document.getElementById('email').textContent = email;
        document.getElementById('phone').textContent = phone;
        document.getElementById('address').textContent = `${address.zipcode} ${address.city}${address.district}${address.street}`;
        document.getElementById('delivery_method').textContent = delivery_method;
      })
      .catch(error => {
        console.error('Error fetching the JSON data:', error);
      });
  });