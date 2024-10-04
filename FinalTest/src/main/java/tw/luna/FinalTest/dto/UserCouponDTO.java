package tw.luna.FinalTest.dto;

public class UserCouponDTO {

    private long userId;
    private CouponDTO coupon;
    private boolean isUsed;

    // 完整构造函数
    public UserCouponDTO(long userId, CouponDTO coupon, boolean isUsed) {
        this.userId = userId;
        this.coupon = coupon;
        this.isUsed = isUsed;
    }

    // Getters 和 Setters
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public CouponDTO getCoupon() {
        return coupon;
    }

    public void setCoupon(CouponDTO coupon) {
        this.coupon = coupon;
    }

    public boolean isUsed() {
        return isUsed;
    }

    public void setUsed(boolean isUsed) {
        this.isUsed = isUsed;
    }
}
