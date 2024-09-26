package tw.luna.FinalTest.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import tw.luna.FinalTest.BCrypt;
import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.Userinfo;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.model.UsersResponse;
import tw.luna.FinalTest.model.UsersStatus;
import tw.luna.FinalTest.repository.UsersInfoReposity;
import tw.luna.FinalTest.repository.UsersRepository;



@Service
public class UsersServiceImpl {
	
	@Autowired
	private UsersRepository usersRepository;
	
	@Autowired
	private UsersInfoReposity usersInfoReposity;

	
	
	public UsersResponse isExistUser(String email) {
		UsersResponse usersResponse = new UsersResponse();
		List<Users> users = usersRepository.findByEmail(email);
		if (users != null && users.size() > 0) {
			usersResponse.setUsersStatus(UsersStatus.EXIST);
			usersResponse.setMesg("帳號已存在");
			usersResponse.setUsers(users.get(0));
		}else {
			usersResponse.setUsersStatus(UsersStatus.NOT_EXIST);
			usersResponse.setMesg("帳號不存在");
			usersResponse.setUsers(null);
		}	
		return usersResponse;	
	}
	
	
	public UsersResponse registUsers(Users users) {
		UsersResponse usersResponse = isExistUser(users.getEmail());
		if(usersResponse.getUsersStatus() == UsersStatus.NOT_EXIST) {
			users.setPassword(BCrypt.hashpw(users.getPassword(), BCrypt.gensalt()));
			Users newUsers = usersRepository.save(users);
			if(newUsers.getUserId() != null) {
				usersResponse.setUsersStatus(UsersStatus.ADD_SUCCESS);
				usersResponse.setMesg("註冊成功");
			}else {
				usersResponse.setUsersStatus(UsersStatus.ADD_FAILURE);
				usersResponse.setMesg("註冊失敗");
				usersResponse.setUsers(users);
			}
		}else {
			usersResponse.setMesg("帳號已存在");
		}
		return usersResponse;
		
	}
	
	public UsersResponse loginUsers(Users users) {
		UsersResponse usersResponse = isExistUser(users.getEmail());
		
		if (usersResponse.getUsersStatus() == UsersStatus.NOT_EXIST) {
			usersResponse.setUsersStatus(UsersStatus.LOGIN_FAILURE);
			usersResponse.setMesg("Login Failure");
			usersResponse.setUsers(users);
		}else {
			Users userDB = usersResponse.getUsers();
			if (BCrypt.checkpw(users.getPassword(), userDB.getPassword())) {
				usersResponse.setUsersStatus(UsersStatus.LOGIN_SUCCESS);
				usersResponse.setMesg("Login Success");
				usersResponse.setUsers(userDB);
				
			}else {
				usersResponse.setUsersStatus(UsersStatus.LOGIN_FAILURE);
				usersResponse.setMesg("Login Failure : 密碼錯誤");
				usersResponse.setUsers(users);				
			}
		}
		
		return usersResponse;
	}
	
	public UserAllInfo userAllInfo(String email) {
		return usersRepository.findAllByEmail(email);
		
	}
	
	public void updateUser(UserAllInfo userAllInfo) {
		Users users = new Users();
		Userinfo userinfo = new Userinfo();
		
		users.setUserId(userAllInfo.getUserId());
		users.setPassword(userAllInfo.getPassword());
		users.setEmail(userAllInfo.getEmail());
		users.setPhoneNumber(userAllInfo.getPhoneNumber());
		users.setUsername(userAllInfo.getUsername());
		
		
//		userinfo.setUserid(userAllInfo.getUserId());
		userinfo.setAddress(userAllInfo.getAddress());
		userinfo.setBirthday(userAllInfo.getBirthday());
		userinfo.setCounty(userAllInfo.getCounty());
		userinfo.setDistrict(userAllInfo.getDistrict());
		userinfo.setFirstName(userAllInfo.getFirstName());
		userinfo.setLastName(userAllInfo.getLastName());
		userinfo.setPostalCode(userAllInfo.getPostalCode());
		
		usersRepository.save(users);
		usersInfoReposity.save(userinfo);
		
		
	}
}
