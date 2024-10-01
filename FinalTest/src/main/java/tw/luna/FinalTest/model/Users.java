package tw.luna.FinalTest.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class Users {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userId")
	private Long userId;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "phoneNumber")
	private String phoneNumber;
	
	@Column(name = "token")
	private String token;
	
	@Column(name = "isDel")
	private boolean isDel;
	
	@Column(name = "isVerified")
	private boolean isVerified;

	@OneToOne(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonManagedReference("Users_UserInfo")
	private Userinfo userinfo;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonManagedReference("order_user")
	private List<Orders> orders;


//	@OneToOne(mappedBy = "users", cascade = CascadeType.ALL)
//	@JsonManagedReference("Users_Cart")
//	private Cart cart;

	public Users() {
	}

	

	public Users(Long userId, String username, String email, String password, String phoneNumber, String token,
			boolean isDel, boolean isVerified) {
		this.userId = userId;
		this.username = username;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.token = token;
		this.isDel = isDel;
		this.isVerified = isVerified;
	}



	public List<Orders> getOrders() {
		return orders;
	}

	public void setOrders(List<Orders> orders) {
		this.orders = orders;
	}


//	public Cart getCart() {
//		return cart;
//	}

//	public void setCart(Cart cart) {
//		this.cart = cart;
//	}

	public Userinfo getUserinfo() {
		return userinfo;
	}

	public void setUserinfo(Userinfo userinfo) {
		this.userinfo = userinfo;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public boolean getIsDel() {
		return isDel;
	}

	public void setIsDel(boolean isDel) {
		this.isDel = isDel;
	}

	public void setDel(boolean isDel) {
		this.isDel = isDel;
	}
	
	public boolean getIsVerified() {
		return isVerified;
	}

	public void setIsVerified(boolean isVerified) {
		this.isVerified = isVerified;
	}



	@Override
	public String toString() {
		return "Users [userId=" + userId + ", username=" + username + ", email=" + email + ", password=" + password
				+ ", phoneNumber=" + phoneNumber + ", token=" + token + ", isDel=" + isDel + ", isVerified="
				+ isVerified + "]";
	}



}
