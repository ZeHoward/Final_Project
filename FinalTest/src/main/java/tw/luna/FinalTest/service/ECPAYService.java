package tw.luna.FinalTest.service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.UUID;


import integration.AllInOne;
import integration.domain.AioCheckOutALL;
import integration.domain.QueryTradeInfoObj;
import integration.exception.EcpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.luna.FinalTest.dto.PostMerchantDto;
import tw.luna.FinalTest.dto.QueryOrderDTO;
import tw.luna.FinalTest.dto.orders.MerchantByUserDto;
import tw.luna.FinalTest.model.Orders;
import tw.luna.FinalTest.model.Pay;
import tw.luna.FinalTest.model.Payment;
import tw.luna.FinalTest.repository.OrdersRepository;
import tw.luna.FinalTest.repository.PayRepository;


@Service
public class ECPAYService {

    @Autowired
    PayRepository payRepository;

    @Autowired
    OrdersRepository ordersRepository;
    public String ecpayCheckout(PostMerchantDto postMerchantDto) throws UnsupportedEncodingException {
        String form = null;
        try {

            String formattedDate = getFormattedCurrentDate();
            // 設定支付訊息
            AllInOne all = new AllInOne("");
            AioCheckOutALL obj = new AioCheckOutALL();
            obj.setMerchantTradeNo(postMerchantDto.getMerchantNo());
            obj.setMerchantTradeDate(formattedDate);
            obj.setTotalAmount(postMerchantDto.getTotal().toString());
            obj.setTradeDesc("test Description");
            obj.setItemName("本次購買總金額");
            obj.setReturnURL("http://localhost:8081/test");
            obj.setNeedExtraPaidInfo("N");
            obj.setClientBackURL("http://localhost:8080/enjoyum");  //!!!!!!!!!!!!!!!!!!!改自己的首頁!!!!!!!!!!!!!!!!!!!!!!
            obj.setNeedExtraPaidInfo("Y");
            // 生成表单
            form = all.aioCheckOut(obj, null);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return form;
    }

    public String queryOrder(QueryOrderDTO queryOrderDTO) {
        // 初始化 AllInOne 物件
        AllInOne all = new AllInOne("");  // 這裡應該填入適當的參數，可能是 HashKey

        // 帶入merchantID及merchantTradeNo即可查詢訂單
        QueryTradeInfoObj queryTradeInfoObj = new QueryTradeInfoObj();
        queryTradeInfoObj.setMerchantID(queryOrderDTO.getMerchantID());
        queryTradeInfoObj.setMerchantTradeNo(queryOrderDTO.getMerchantTradeNo());
//        queryTradeInfoObj.setTimeStamp(EcpayFunction.genUnixTimeStamp());

        try {
            // 調用 AllInOne 的 queryTradeInfo 方法
            String result = all.queryTradeInfo(queryTradeInfoObj);
            // 將字串依據 "&" 分割為多個鍵值對
            String[] pairs = result.split("&");
            // 創建一個 JSON 物件來存放結果
            // 使用 Stream API 簡化分割和處理邏輯
            JSONObject json = new JSONObject();
            //把傳回的物件格式轉為json
            Arrays.stream(result.split("&"))
                    .map(pair -> pair.split("=", 2)) // 分割每個鍵值對
                    .forEach(keyValue -> json.put(keyValue[0], keyValue.length > 1 ? keyValue[1] : "")); // 添加到 JSON


            // 如果取出的TradeStatus為"1" 表示已付款
            if (json.get("TradeStatus").equals("1")) {
                //將本筆訂單資料庫的付款狀態改為一
//                System.out.println(5);
            }else {
                //提示使用者 尚未付款
//                System.out.println(6);
            }
            return result;
        } catch (EcpayException e) {
            // 異常處理
            System.err.println("Error querying order: " + e.getMessage());
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }


//暫不加入檢查碼
//    public static String generateCheckMacValue(String hashKey, String hashIV, QueryOrderDTO queryOrderDTO) {
//        // 將參數按照順序排序並串接
//        String rawData = "HashKey=" + hashKey + "&MerchantID=" + queryOrderDTO.getMerchantID() +
//                "&MerchantTradeNo=" + queryOrderDTO.getMerchantTradeNo() +
//                "&TimeStamp=" + queryOrderDTO.getTimeStamp() + "&HashIV=" + hashIV;
//
//        // URL encode
//        String urlEncodedData = URLEncoder.encode(rawData, StandardCharsets.UTF_8);
//
//        // 使用 SHA256 進行加密
//        String sha256Hex = DigestUtils.sha256Hex(urlEncodedData);
//
//        // 返回大寫的結果
//        return sha256Hex.toUpperCase();
//    }

    // 封装日期格式化方法
    private String getFormattedCurrentDate() {
        //取得當前時間
        LocalDateTime localDateTime = LocalDateTime.now();
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        // 去除小數
        String dateStr = localDateTime.toString();
        LocalDateTime dateTime = LocalDateTime.parse(dateStr, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        return dateTime.format(outputFormatter);
    }

    public String changeOrderStatus(String merchantNo) {

        Orders orders = ordersRepository.findByMerchantNo(merchantNo);

        if(orders != null){
            orders.setStatus("completed");
            ordersRepository.save(orders);
            return "paid";
        }else{
            return "no paid";
        }
    }
}