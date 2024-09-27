	package tw.luna.FinalTest.model;
	
	import java.time.LocalDateTime;
	import java.util.List;
	
	import com.fasterxml.jackson.annotation.JsonBackReference;
	import com.fasterxml.jackson.annotation.JsonManagedReference;
	
	import jakarta.persistence.CascadeType;
	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.FetchType;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.JoinColumn;
	import jakarta.persistence.ManyToOne;
	import jakarta.persistence.OneToMany;
	import jakarta.persistence.Table;
	
	@Entity
	@Table(name = "orders")
	public class Order {
	
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
		
		@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
		@JsonManagedReference
	    private List<OrderDetails> orderDetails;
	
	    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	    private List<Payment> payments;
	
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
	
		public List<OrderDetails> getOrderDetails() {
			return orderDetails;
		}
	
		public void setOrderDetails(List<OrderDetails> orderDetails) {
			this.orderDetails = orderDetails;
		}
	
		public List<Payment> getPayments() {
			return payments;
		}
	
		public void setPayments(List<Payment> payments) {
			this.payments = payments;
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
	
	}
