
// // 縣市區域及郵遞區號
// const districts = {
//   台北市: {
//     中正區: "100",
//     大同區: "103",
//     中山區: "104",
//     松山區: "105",
//     大安區: "106",
//     萬華區: "108",
//     信義區: "110",
//     士林區: "111",
//     北投區: "112",
//     內湖區: "114",
//     南港區: "115",
//     文山區: "116",
//   },
//   新北市: {
//     三峽區: "237",
//     三興區: "243",
//     三重區: "241",
//     林口區: "244",
//     新店區: "231",
//     新莊區: "242",
//     板橋區: "220",
//     淡水區: "251",
//     汐止區: "207",
//     土城區: "236",
//     永和區: "234",
//     中和區: "235",
//     瑞芳區: "224",
//   },
//   桃園市: {
//     桃園市: "330",
//     中壢市: "320",
//     平鎮市: "324",
//     楊梅市: "326",
//     龜山區: "333",
//     八德區: "334",
//     龍潭區: "325",
//     大溪區: "335",
//     觀音區: "328",
//     新屋區: "327",
//     芦竹區: "338",
//   },
//   台中市: {
//     中區: "400",
//     東區: "401",
//     南區: "402",
//     西區: "403",
//     北區: "404",
//     西屯區: "407",
//     南屯區: "408",
//     北屯區: "406",
//     大里區: "412",
//   },
//   台南市: {
//     中西區: "700",
//     東區: "701",
//     南區: "702",
//     北區: "704",
//     安平區: "708",
//     安南區: "709",
//     永康區: "710",
//     歸仁區: "711",
//     新化區: "712",
//     玉井區: "713",
//     官田區: "714",
//     麻豆區: "715",
//   },
//   高雄市: {
//     苓雅區: "802",
//     鼓山區: "804",
//     左營區: "813",
//     鳳山區: "830",
//     大寮區: "831",
//     大樹區: "833",
//     大社區: "815",
//     小港區: "812",
//     楠梓區: "811",
//     三民區: "807",
//     前鎮區: "806",
//     旗津區: "805",
//   },
//   基隆市: {
//     仁愛區: "200",
//     信義區: "201",
//     中正區: "202",
//     安樂區: "204",
//     七堵區: "205",
//   },
//   新竹市: {
//     東區: "300",
//     北區: "300",
//     香山區: "304",
//   },
//   嘉義縣: {
//     番路鄉: '602',
//     梅山鄉: '603',
//     竹崎鄉: '604',
//     阿里山鄉: '605',
//     中埔鄉: '606',
//     大埔鄉: '607',
//     水上鄉: '608',
//     鹿草鄉: '611',
//     太保市: '612',
//     朴子市: '613',
//     布袋鎮: '614'
//   },
//   嘉義市: {
//     東區: "600",
//     西區: "601",
//   },
//   苗栗縣: {
//     苗栗市: "360",
//     苑裡鎮: "362",
//     公館鄉: "363",
//     竹南鎮: "350",
//     頭份市: "351",
//   },
//   新竹縣: {
//     竹北市: "302",
//     湖口鄉: "303",
//     新豐鄉: "304",
//     新埔鎮: "305",
//   },
//   屏東縣: {
//     屏東市: "900",
//     潮州鎮: "920",
//     恆春鎮: "946",
//     萬丹鄉: "910",
//   },
//   宜蘭縣: {
//     宜蘭市: "260",
//     羅東鎮: "265",
//     冬山鄉: "266",
//     蘇澳鎮: "270",
//   },
//   花蓮縣: {
//     花蓮市: "970",
//     吉安鄉: "971",
//     壽豐鄉: "972",
//     鳳林鎮: "973",
//   },
//   台東縣: {
//     台東市: "950",
//     成功鎮: "951",
//     關山鎮: "952",
//     卑南鄉: "953",
//   },
//   連江縣: {
//     南竿鄉: "209",
//     北竿鄉: "210",
//   },
//   澎湖縣: {
//     馬公市: "880",
//     西嶼鄉: "881",
//     望安鄉: "882",
//   },
//   金門縣: {
//     金門縣: "890",
//   },
// };

// function updateDistricts() {
//   const citySelect = document.getElementById("city-select");
//   const districtSelect = document.getElementById("district-select");
//   const zipcodeSelect = document.getElementById("zipcode-select");
//   const selectedCity = citySelect.value;

//   // 清空區域和郵遞區號選單
//   districtSelect.innerHTML = '<option value="">請選擇區域</option>';
//   zipcodeSelect.innerHTML = '<option value="">郵遞區號</option>';

//   if (selectedCity) {
//       const districtOptions = Object.keys(districts[selectedCity]);
//       districtOptions.forEach(district => {
//           const option = document.createElement("option");
//           option.value = district;
//           option.textContent = district;
//           districtSelect.appendChild(option);
//       });
//   }
// }

// function updateZipCode() {
//   const citySelect = document.getElementById("city-select");
//   const districtSelect = document.getElementById("district-select");
//   const zipcodeSelect = document.getElementById("zipcode-select");
//   const selectedCity = citySelect.value;
//   const selectedDistrict = districtSelect.value;

//   // 清空郵遞區號選單
//   zipcodeSelect.innerHTML = '<option value="">郵遞區號</option>';

//   if (selectedCity && selectedDistrict) {
//       const zipCode = districts[selectedCity][selectedDistrict];
//       const option = document.createElement("option");
//       option.value = zipCode;
//       option.textContent = zipCode;
//       zipcodeSelect.appendChild(option);
//   }
// }
// //以上為縣市區域、郵遞區號


// // document.addEventListener('DOMContentLoaded', () => {
// //   fetch('checkout.json')
// //     .then(response => response.json())
// //     .then(data => {
// //       console.log('Data loaded:', data); // 確認 JSON 資料是否正確載入

// //       const productList = document.getElementById('items-container');
// //       let subtotal = 0;

// //       data.items.forEach(product => {
// //         const itemDiv = document.createElement('div');
// //         itemDiv.classList.add('item');

// //         const img = document.createElement('img');
// //         img.src = product.image;
// //         img.alt = product.name;

// //         const detailsDiv = document.createElement('div');
// //         detailsDiv.classList.add('item-details');

// //         const nameDiv = document.createElement('div');
// //         nameDiv.textContent = product.name;

// //         const priceDiv = document.createElement('div');
// //         priceDiv.classList.add('item-price');
// //         priceDiv.textContent = `NT$${product.price}`;

// //         const quantityDiv = document.createElement('div');
// //         quantityDiv.textContent = `數量：${product.quantity}`;

// //         detailsDiv.appendChild(nameDiv);
// //         detailsDiv.appendChild(priceDiv);
// //         detailsDiv.appendChild(quantityDiv);

// //         itemDiv.appendChild(img);
// //         itemDiv.appendChild(detailsDiv);

// //         productList.appendChild(itemDiv);

// //         subtotal += product.price * product.quantity;
// //       });

// //       document.getElementById('subtotal').textContent = `商品小計：NT$${data.subtotal}`;
// //       document.getElementById('discount').textContent = `優惠碼折抵：NT$${data.discount}`;
// //       document.getElementById('shipping').textContent = `運費：NT$${data.shipping}`;
// //       document.getElementById('total').textContent = `付款總金額：NT$${data.total}`;
// //     })
// //     .catch(error => {
// //       console.error('Error fetching data:', error);
// //     });
// // // });
// // const { createApp, ref, onMounted, computed } = Vue;

// // createApp({
// //   setup() {
// //     const city = ref("");
// //     const area = ref("");
// //     const districts = ref([]);

// //     const cityDistricts = {
// //       "台北市": ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
// //       "新北市": ["板橋區", "三峡區", "淡水區", "新莊區", "樹林區", "三芝區", "汐止區", "林口區", "五股區", "八里區", "金山區", "瑞芳區", "貢寮區", "雙溪區", "石碇區", "深坑區", "坪林區", "烏來區"],
// //       // ...其他縣市的區域
// //     };

// //     // 當縣市變更時更新區域
// //     const updateDistricts = () => {
// //       districts.value = cityDistricts[city.value] || [];
// //       area.value = ""; // 清空區域選擇
// //     };

// //     return {
// //       city,
// //       area,
// //       districts,
// //       updateDistricts,
// //     };
// //   },
// // }).mount("#myContainer");