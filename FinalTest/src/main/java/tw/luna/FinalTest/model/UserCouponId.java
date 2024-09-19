package tw.luna.FinalTest.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Entity;

public class UserCouponId implements Serializable {

    private long userId;
    private long couponId;

    public UserCouponId() {}

    public UserCouponId(long userId, long couponId) {
        this.userId = userId;
        this.couponId = couponId;
    }

    // Getters and Setters
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getCouponId() {
        return couponId;
    }

    public void setCouponId(long couponId) {
        this.couponId = couponId;
    }

    // 必須覆寫 equals 和 hashCode 方法，JPA 依賴這些方法來識別實體
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCouponId that = (UserCouponId) o;
        return userId == that.userId && couponId == that.couponId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, couponId);
    }
}

