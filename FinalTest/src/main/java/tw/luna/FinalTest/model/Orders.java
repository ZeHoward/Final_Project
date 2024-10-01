package tw.luna.FinalTest.model;
	
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "orderId")
public class Orders {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "orderId")
	private Integer orderId;

	@ManyToOne( fetch = FetchType.EAGER)
	@JoinColumn(name = "userId", nullable = false)
	@JsonBackReference("order_user")
	private Users user;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "cartId", nullable = false)
	private Cart cart;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "couponId", nullable = true)
	private Coupon coupon;

	@Column(name = "orderDate")
	private LocalDateTime orderDate;

	@Column(name = "totalAmount")
	private Integer totalAmount;

	@Column(name = "percentageDiscount")
	private Integer percentageDiscount;

	@Column(name = "amountDiscount")
	private Integer amountDiscount;

	@Column(name = "finalAmount")
	private Integer finalAmount;

	@Column(name = "status")
	private String status;

	@Column(name = "Address")
	private String address;

	@OneToMany(mappedBy = "orders", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference("orders_orderDetails")
	private List<OrderDetails> orderDetails;

	@OneToOne(mappedBy = "orders", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Payment payment;
	



	public Orders() {

	}


	public Orders(Integer orderId, Users user, Cart cart, Coupon coupon, LocalDateTime orderDate, Integer totalAmount, Integer percentageDiscount, Integer amountDiscount, Integer finalAmount, String status, String address, List<OrderDetails> orderDetails, List<Payment> payments) {
		this.orderId = orderId;
		this.user = user;
		this.cart = cart;
		this.coupon = coupon;
		this.orderDate = orderDate;
		this.totalAmount = totalAmount;
		this.percentageDiscount = percentageDiscount;
		this.amountDiscount = amountDiscount;
		this.finalAmount = finalAmount;
		this.status = status;
		this.payment = payment;
		this.address = address;
		this.orderDetails = orderDetails;
	}

	
	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public Coupon getCoupon() {
		return coupon;
	}

	public void setCoupon(Coupon coupon) {
		this.coupon = coupon;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}	

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<OrderDetails> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetails> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Orders{" +
				"orderId=" + orderId +
				", user=" + user +
				", totalAmount=" + totalAmount +
				", percentageDiscount=" + percentageDiscount +
				", amountDiscount=" + amountDiscount +
				", finalAmount=" + finalAmount +
				", status='" + status + '\'' +
				", address='" + address + '\'' +
				", payments=" + payment +
				", orderDate=" + orderDate +
				'}';
	}

}