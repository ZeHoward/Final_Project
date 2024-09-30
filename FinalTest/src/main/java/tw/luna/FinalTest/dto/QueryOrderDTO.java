package tw.luna.FinalTest.dto;

public class QueryOrderDTO {
    private String merchantID;
    private String merchantTradeNo;
    private Long timeStamp;
    private String checkMacValue;
    private String platformID;

    public QueryOrderDTO(String merchantID, String merchantTradeNo, Long timeStamp, String checkMacValue, String platformID) {
        this.merchantID = merchantID;
        this.merchantTradeNo = merchantTradeNo;
        this.timeStamp = timeStamp;
        this.checkMacValue = checkMacValue;
        this.platformID = platformID;
    }

    public String getMerchantID() {
        return merchantID;
    }

    public void setMerchantID(String merchantID) {
        this.merchantID = merchantID;
    }

    public String getMerchantTradeNo() {
        return merchantTradeNo;
    }

    public void setMerchantTradeNo(String merchantTradeNo) {
        this.merchantTradeNo = merchantTradeNo;
    }

    public Long getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Long timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getCheckMacValue() {
        return checkMacValue;
    }

    public void setCheckMacValue(String checkMacValue) {
        this.checkMacValue = checkMacValue;
    }

    public String getPlatformID() {
        return platformID;
    }

    public void setPlatformID(String platformID) {
        this.platformID = platformID;
    }
}
