// 縣市區域及郵遞區號
const districts = {
    taipei: {
      中正區: "100",
      大同區: "103",
      中山區: "104",
      松山區: "105",
      大安區: "106",
      萬華區: "108",
      信義區: "110",
      士林區: "111",
      北投區: "112",
      內湖區: "114",
      南港區: "115",
      文山區: "116",
    },
    newtaipei: {
      三峽區: "237",
      三興區: "243",
      三重區: "241",
      林口區: "244",
      新店區: "231",
      新莊區: "242",
      板橋區: "220",
      淡水區: "251",
      汐止區: "207",
      土城區: "236",
      永和區: "234",
      中和區: "235",
      瑞芳區: "224",
    },
    taoyuan: {
      桃園市: "330",
      中壢市: "320",
      平鎮市: "324",
      楊梅市: "326",
      龜山區: "333",
      八德區: "334",
      龍潭區: "325",
      大溪區: "335",
      觀音區: "328",
      新屋區: "327",
      芦竹區: "338",
    },
    taichung: {
      中區: "400",
      東區: "401",
      南區: "402",
      西區: "403",
      北區: "404",
      西屯區: "407",
      南屯區: "408",
      北屯區: "406",
      大里區: "412",
    },
    tainan: {
      中西區: "700",
      東區: "701",
      南區: "702",
      北區: "703",
      安平區: "708",
      安南區: "709",
      永康區: "710",
      歸仁區: "711",
      新化區: "712",
      玉井區: "713",
      官田區: "714",
      麻豆區: "715",
    },
    kaohsiung: {
      苓雅區: "802",
      鼓山區: "804",
      左營區: "813",
      鳳山區: "830",
      大寮區: "831",
      大樹區: "833",
      大社區: "436",
      小港區: "812",
      楠梓區: "811",
      三民區: "807",
      前鎮區: "806",
      旗津區: "805",
    },
    keelung: {
      仁愛區: "200",
      信義區: "201",
      中正區: "202",
      安樂區: "204",
      七堵區: "205",
    },
    hsinchu: {
      東區: "300",
      北區: "300",
      香山區: "300",
    },
    chiayicounty: { // 嘉義縣
        番路鄉: '602',
        梅山鄉: '603',
        竹崎鄉: '604',
        阿里山鄉: '605',
        中埔鄉: '606',
        大埔鄉: '607',
        水上鄉: '608',
        鹿草鄉: '611',
        太保市: '612',
        朴子市: '613',
        布袋鎮: '614'
    },
    chiayi: {
      東區: "600",
      西區: "601",
    },
    miaoli: {
      苗栗市: "360",
      苑裡鎮: "362",
      公館鄉: "363",
      竹南鎮: "350",
      頭份市: "351",
    },
    hsinchucounty: {
      竹北市: "302",
      湖口鄉: "303",
      新豐鄉: "304",
      新埔鎮: "305",
    },
    pingtung: {
      屏東市: "900",
      潮州鎮: "920",
      恆春鎮: "946",
      萬丹鄉: "910",
    },
    yilan: {
      宜蘭市: "260",
      羅東鎮: "265",
      冬山鄉: "266",
      蘇澳鎮: "270",
    },
    hualien: {
      花蓮市: "970",
      吉安鄉: "971",
      壽豐鄉: "972",
      鳳林鎮: "973",
    },
    taitung: {
      台東市: "950",
      成功鎮: "951",
      關山鎮: "952",
      卑南鄉: "953",
    },
    lienchiang: {
      南竿鄉: "209",
      北竿鄉: "210",
    },
    penghu: {
      馬公市: "880",
      西嶼鄉: "881",
      望安鄉: "882",
    },
    jinmen: {
      金門縣: "890",
    },
  };

  
  document.getElementById("city").addEventListener("change", function () {
    const city = this.value;
    const districtSelect = document.getElementById("district");
    const zipcodeInput = document.getElementById("zipcode");

    // 清空區域和郵遞區號輸入框
    districtSelect.innerHTML =
      '<option value="" disabled selected>選擇區域</option>';
    zipcodeInput.value = "";

    // 根據選擇的城市填入區域選項
    if (districts[city]) {
      for (const [district, code] of Object.entries(districts[city])) {
        const option = document.createElement("option");
        option.value = district; // 設定區域名稱為選項值
        option.textContent = district;
        districtSelect.appendChild(option);
      }
    }
  });

  document
    .getElementById("district")
    .addEventListener("change", function () {
      const city = document.getElementById("city").value;
      const district = this.options[this.selectedIndex].textContent;
      const zipcodeInput = document.getElementById("zipcode");

      // 確保 city 和 district 的值正確
      if (city && districts[city] && districts[city][district]) {
        zipcodeInput.value = districts[city][district];
      } else {
        zipcodeInput.value = "";
      }
    });

//以上為縣市區域、郵遞區號


document.addEventListener('DOMContentLoaded', () => {
    fetch('checkout.json')
      .then(response => response.json())
      .then(products => {
        console.log('Products loaded:', products); // 確認 JSON 資料是否正確載入
        const productList = document.getElementById('items-container'); // 這裡應該是 'items-container' 而不是 'product-list'
        let subtotal = 0;
  
        products.items.forEach(product => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('item');
  
          const img = document.createElement('img');
          img.src = product.image; // 使用 'image' 而不是 'img'
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
  
        document.getElementById('subtotal').textContent = `商品小計：NT$${subtotal}`;
        document.getElementById('total').textContent = `付款總金額：NT$${subtotal + 120}`;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  });
  