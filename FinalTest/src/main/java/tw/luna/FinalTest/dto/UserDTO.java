package tw.luna.FinalTest.dto;

public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private String phoneNumber;
    private String address;
    private boolean isDel;
    private String authType;
    
  
    public UserDTO() {
	}

	public UserDTO(Long userId, String username, String email, String phoneNumber, String address) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
    
    public UserDTO(Long userId, String username, String email, boolean isDel) {
    	this.userId = userId;
    	this.username = username;
    	this.email = email;
    	this.isDel = isDel;
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


	public boolean getIsDel() {
		return isDel;
	}


	public void setIsDel(boolean isDel) {
		this.isDel = isDel;
	}
}