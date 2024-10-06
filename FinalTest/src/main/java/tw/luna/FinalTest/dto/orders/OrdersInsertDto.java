package tw.luna.FinalTest.dto.orders;

import jakarta.persistence.Column;
import tw.luna.FinalTest.model.DiscountType;

import java.time.LocalDate;
import java.time.LocalDateTime;

//建立訂單  表payment、orders、orderDetails

public class OrdersInsertDto {

    //payment
//    private LocalDateTime paymentDate; //now
    private Integer paymentAmount; //cart
    private String merchantNo; //點擊進入綠界時取得---訂單編號


    //orders
//    private LocalDateTime orderDate; //now
    private Integer totalAmount;//cart
    private Integer percentageDiscount;//cart
    private Integer amountDiscount;//cart
    private Integer finalAmount;//cart
//    private String status; //預設為未付款
    private String address;//cart


    //orderDetails
//    private Integer quantity; //cartitems
//    private Integer price; //cartitems



    //coupon
    private String code;

    public OrdersInsertDto() {
    }

    public OrdersInsertDto(Integer paymentAmount, Integer totalAmount, Integer percentageDiscount, Integer amountDiscount, Integer finalAmount, String address, String code) {
        this.paymentAmount = paymentAmount;
        this.totalAmount = totalAmount;
        this.percentageDiscount = percentageDiscount;
        this.amountDiscount = amountDiscount;
        this.finalAmount = finalAmount;
        this.address = address;
        this.code = code;
    }
    public String getMerchantNo() {
        return merchantNo;
    }

    public void setMerchantNo(String merchantNo) {
        this.merchantNo = merchantNo;
    }

    public Integer getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(Integer paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public Integer getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Integer totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Integer getPercentageDiscount() {
        return percentageDiscount;
    }

    public void setPercentageDiscount(Integer percentageDiscount) {
        this.percentageDiscount = percentageDiscount;
    }

    public Integer getAmountDiscount() {
        return amountDiscount;
    }

    public void setAmountDiscount(Integer amountDiscount) {
        this.amountDiscount = amountDiscount;
    }

    public Integer getFinalAmount() {
        return finalAmount;
    }

    public void setFinalAmount(Integer finalAmount) {
        this.finalAmount = finalAmount;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}