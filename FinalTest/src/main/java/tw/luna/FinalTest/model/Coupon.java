
package tw.luna.FinalTest.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "coupons")
public class Coupon {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "couponId")
	private long couponId;

	@Column(name = "code")
	private String code;

	@Column(name = "name")
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(name = "discountType")
	private DiscountType discountType; // 使用枚舉

	@Column(name = "discountValue")
	private int discountValue;

	@Column(name = "expiryDate")
	private LocalDate expiryDate;


	@Column(name = "isActive")
	private boolean isActive;


	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	public Coupon(long couponId, String code, String name, DiscountType discountType, int discountValue, LocalDate expiryDate) {
		this.couponId = couponId;
		this.code = code;
		this.name = name;
		this.discountType = discountType;
		this.discountValue = discountValue;
		this.expiryDate = expiryDate;
	}

	public DiscountType getDiscountType() {
		return discountType;
	}

	public void setDiscountType(DiscountType discountType) {
		this.discountType = discountType;
	}

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

	public Coupon() {
	}

	public Coupon(String code, String name, DiscountType discountType, int discountValue, LocalDate expiryDate) {
		this.code = code;
		this.name = name;
		this.discountType = discountType;
		this.discountValue = discountValue;
		this.expiryDate = expiryDate;
	}

	@Override
	public String toString() {
		return "Coupon{" +
				"couponId=" + couponId +
				", code='" + code + '\'' +
				", name='" + name + '\'' +
				", discountType=" + discountType +
				", discountValue=" + discountValue +
				", expiryDate=" + expiryDate +
				'}';
	}


}
