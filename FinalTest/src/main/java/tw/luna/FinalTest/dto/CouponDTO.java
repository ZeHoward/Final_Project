package tw.luna.FinalTest.Dto;

import java.time.LocalDate;

public class CouponDTO {
    private long couponId;
    private String code;
    private String name;
    private String discountType;
    private int discountValue;
    private LocalDate expiryDate;
    private boolean isActive;

    // 完整构造函数
    public CouponDTO(long couponId, String code, String name, String discountType, int discountValue, LocalDate expiryDate, boolean isActive) {
        this.couponId = couponId;
        this.code = code;
        this.name = name;
        this.discountType = discountType;
        this.discountValue = discountValue;
        this.expiryDate = expiryDate;
        this.isActive = isActive;
    }

    // 单个参数构造函数
    public CouponDTO(long couponId) {
        this.couponId = couponId;
    }

    // Getters 和 Setters
    public long getCouponId() {
        return couponId;
    }

    public void setCouponId(long couponId) {
        this.couponId = couponId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDiscountType() {
        return discountType;
    }

    public void setDiscountType(String discountType) {
        this.discountType = discountType;
    }

    public int getDiscountValue() {
        return discountValue;
    }

    public void setDiscountValue(int discountValue) {
        this.discountValue = discountValue;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
}
