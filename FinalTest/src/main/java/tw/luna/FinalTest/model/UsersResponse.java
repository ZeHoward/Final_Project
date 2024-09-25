package tw.luna.FinalTest.model;

public class UsersResponse {
	
	private UsersStatus usersStatus;
	private String mesg ;
	private Users users;
	public UsersStatus getUsersStatus() {
		return usersStatus;
	}
	public void setUsersStatus(UsersStatus usersStatus) {
		this.usersStatus = usersStatus;
	}
	public String getMesg() {
		return mesg;
	}
	public void setMesg(String mesg) {
		this.mesg = mesg;
	}
	public Users getUsers() {
		return users;
	}
	public void setUsers(Users users) {
		this.users = users;
	}
	 
}
