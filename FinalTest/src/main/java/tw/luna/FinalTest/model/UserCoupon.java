package tw.luna.FinalTest.model;

import jakarta.persistence.*;


@Entity
@Table(name = "usercoupons")
@IdClass(UserCouponId.class)
public class UserCoupon {

    @Id
    @Column(name = "userId")
    private long userId;

    @Id
    @Column(name = "couponId")
    private long couponId;

    @Column(name = "isUsed")
    private boolean isUsed;

    // 多對一關係，關聯到 Coupon 表
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "couponId", insertable = false, updatable = false) // couponId 为外键
    private Coupon coupon;


    public Coupon getCoupon() {
        return coupon;
    }

    public void setCoupon(Coupon coupon) {
        this.coupon = coupon;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getCouponId() {
        return couponId;
    }

    public void setCouponId(long l) {
        this.couponId = l;
    }

    public boolean isUsed() {
        return isUsed;
    }

    public void setUsed(boolean isUsed) {
        this.isUsed = isUsed;
    }


}

