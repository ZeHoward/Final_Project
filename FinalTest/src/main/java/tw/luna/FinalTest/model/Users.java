package tw.luna.FinalTest.model;

import java.util.List;

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
	
	@OneToOne(mappedBy = "users", cascade = CascadeType.ALL)
	@JoinColumn(name = "userid", referencedColumnName = "userid")
	@JsonManagedReference
	private Userinfo userinfo;
	
	//連到最愛商品表
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<UserFavoritesProducts> userFavoritesProducts;
	
	
	//連到最愛食譜表
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<UserFavoritesRecipes> userFavoritesRecipes;
	
	
	//連到購物車表
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
	private Cart cart;

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

	public List<UserFavoritesProducts> getUserFavoritesProducts() {
		return userFavoritesProducts;
	}

	public void setUserFavoritesProducts(List<UserFavoritesProducts> userFavoritesProducts) {
		this.userFavoritesProducts = userFavoritesProducts;
	}

	public List<UserFavoritesRecipes> getUserFavoritesRecipes() {
		return userFavoritesRecipes;
	}

	public void setUserFavoritesRecipes(List<UserFavoritesRecipes> userFavoritesRecipes) {
		this.userFavoritesRecipes = userFavoritesRecipes;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}
	
	
	
}
