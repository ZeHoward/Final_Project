package tw.luna.FinalTest.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class VerificationToken {
	private String token;
	private Long userId;
	private LocalDateTime expirationTime;
	
	
	
	public VerificationToken() {
		
	}


	public VerificationToken(Users user) {
	    this.token = UUID.randomUUID().toString();
	    this.userId = user.getUserId();
	    this.expirationTime = LocalDateTime.now().plusMinutes(5); // 設置令牌過期時間，例如24小時
	}


	public String getToken() {
		return token;
	}


	public void setToken(String token) {
		this.token = token;
	}


	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}


	public LocalDateTime getExpirationTime() {
		return expirationTime;
	}


	public void setExpirationTime(LocalDateTime expirationTime) {
		this.expirationTime = expirationTime;
	}
	
	
}
