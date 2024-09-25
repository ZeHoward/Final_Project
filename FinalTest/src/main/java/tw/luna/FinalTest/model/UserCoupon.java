package tw.luna.FinalTest.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;


@Entity
@Table(name="usercoupons")
@IdClass(UserCouponId.class)
public class UserCoupon {
	
	@Id
	@Column(name ="userId")
    private long userId;
	
	@Id
	@Column(name = "couponId")
    private long couponId;
	
	@Column(name="isUsed")
    private boolean isUsed;
    
    
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

