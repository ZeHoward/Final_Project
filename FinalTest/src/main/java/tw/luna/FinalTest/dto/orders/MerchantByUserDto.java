package tw.luna.FinalTest.dto.orders;

public class MerchantByUserDto {

    private String 	merchantNo;

    public MerchantByUserDto() {
    }

    public MerchantByUserDto(String merchantNo) {
        this.merchantNo = merchantNo;
    }

    public String getMerchantNo() {
        return merchantNo;
    }

    public void setMerchantNo(String merchantNo) {
        this.merchantNo = merchantNo;
    }
}
