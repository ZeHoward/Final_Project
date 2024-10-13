const { createApp, ref, onMounted, computed, watch } = Vue;
createApp({
  setup() {
    const params = new URLSearchParams(window.location.search);
    const totalAmount = params.get("totalAmount");
    const finalAmount2 = params.get("finalAmount2");
    const couponCode = params.get("couponCode");
    const percentageDiscount = params.get("percentageDiscount");
    const api = ref("/api");
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

    const isGetCart = ref(false);
    
    const address = params.get("address")
    const pay = ref(false)
    const form = ref("")
    const merchantTradeNo = ref("")
    const sendCheckoutForm = ref({})
    const isSubmit = ref(false)
    const discountAmount = params.get("discountAmount2") 

    const getUserId = async () => {
      const res = await axios.get(`/users/userAllInfo`);
      userId.value = res.data.userId;
      console.log(userId.value);
      getCart();
    };

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
      isGetCart.value = true;
      products.value = res.data
    };


    //*********code  percentageDiscount   amountDiscount  */
    const orderData = {
      // 後端DTO參數 : 這頁對應的變數
      paymentAmount:finalAmount2,
      totalAmount:totalAmount,
      finalAmount:finalAmount2,
      address:`${zipCode} ${city} ${area} ${address} ` ,
      merchantNo:merchantNo,
      amountDiscount:　discountAmount,
      percentageDiscount:percentageDiscount,
      code:couponCode,

    }

    const paymentData = {
      total:finalAmount2,
      merchantNo:merchantNo,

      couponCode:couponCode,
      discountAmount:discountAmount,

    }

    const getPayment = async () => {
      const res = await axios.post(`${api.value}/ECPAY/ecpayCheckout`,paymentData);
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


    //將收件者資料及購物車商品資料存進資料庫
    const addToOrders = async () => {      
      try{
      const res = await axios.post(`${api.value}/orders/${userId.value}`,orderData)
        
      if(res.status === 200){
        getPayment()
        //訂單建立後清空購物車
        axios.delete(`${api.value}/cart/${userId.value}`).then
        ((res) => console.log(res)).catch((err) => console.log(err))    
        
        
        //跳轉頁面並且帶著付款金額及marchantNo
          }
    } catch (error){
      console.log('訂單建立失敗:',error);
      alert('訂單建立失敗請稍後再試');
    }
             };

    
    onMounted(() => {
      getUserId()
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
      address,
      form,
      pay,
      merchantTradeNo,
      isSubmit,
      discountAmount,
      percentageDiscount,
      isGetCart
    }
    }
    }).mount("#myContainer")
