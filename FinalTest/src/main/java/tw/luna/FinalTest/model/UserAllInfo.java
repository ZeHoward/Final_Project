package tw.luna.FinalTest.model;

public class UserAllInfo {
	
	private Long userId;
	private String username;
	private String email;
	private String password;
	private String phoneNumber;
	private String firstName;
	private String lastName;
	private String address;
	private String postalCode;
	private String county;
	private String district;
	private String birthday;
	private boolean isDel;
	private boolean isVerified;
	private String authType;
	
	public UserAllInfo() {
		
	}

	public UserAllInfo(Long userId, String username, String email, String password, String phoneNumber,
			String firstName, String lastName, String address, String postalCode, String county, String district,
			String birthday, boolean isDel, boolean isVerified, String authType) {
		this.userId = userId;
		this.username = username;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.postalCode = postalCode;
		this.county = county;
		this.district = district;
		this.birthday = birthday;
		this.isDel = isDel;
		this.isVerified = isVerified;
		this.authType = authType;
	}





	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public String getDistrict() {
		return district;
	}


	public void setDistrict(String district) {
		this.district = district;
	}


	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
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
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}


	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public boolean getIsDel() {
		return isDel;
	}

	public void setIsDel(boolean isDel) {
		this.isDel = isDel;
	}


	public boolean getIsVerified() {
		return isVerified;
	}

	public void setIsVerified(boolean isVerified) {
		this.isVerified = isVerified;
	}


	public String getAuthType() {
		return authType;
	}

	public void setAuthType(String authType) {
		this.authType = authType;
	}

	public void setDel(boolean isDel) {
		this.isDel = isDel;
	}

	public void setVerified(boolean isVerified) {
		this.isVerified = isVerified;
	}

	@Override
	public String toString() {
		return "UserAllInfo [userId=" + userId + ", username=" + username + ", email=" + email + ", password="
				+ password + ", phoneNumber=" + phoneNumber + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", address=" + address + ", postalCode=" + postalCode + ", county=" + county + ", district="
				+ district + ", birthday=" + birthday + ", isDel=" + isDel + ", isVerified=" + isVerified
				+ ", authType=" + authType + "]";
	}


}
