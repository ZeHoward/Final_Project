package tw.luna.FinalTest.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

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
	

	@Autowired
	private EmailCheckService emailCheckService;
	
	public UsersResponse isExistUser(String email) {
		UsersResponse usersResponse = new UsersResponse();
		List<Users> users = usersRepository.findByEmail(email);
		if (users != null && users.size() > 0 && !users.get(0).getIsDel()) {
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
	
	
	public UsersResponse registUsers(UserAllInfo registUser) {
		UsersResponse usersResponse = isExistUser(registUser.getEmail());
		if(usersResponse.getUsersStatus() == UsersStatus.NOT_EXIST) {
			registUser.setPassword(BCrypt.hashpw(registUser.getPassword(), BCrypt.gensalt()));
			Users newUsers = new Users();
			newUsers.setEmail(registUser.getEmail());
			newUsers.setPassword(registUser.getPassword());
			newUsers.setPhoneNumber(null);
			newUsers.setUsername(registUser.getUsername());
			newUsers.setPhoneNumber(registUser.getPhoneNumber());
			
			String token = UUID.randomUUID().toString();
			newUsers.setToken(token);
			newUsers.setIsVerified(false);
			
			Users savedUser = usersRepository.save(newUsers);
			emailCheckService.sendVerificationEmail(newUsers.getEmail(), token);
			
			Userinfo userinfo = new Userinfo();
			userinfo.setUsers(newUsers);
			Userinfo save2 = usersInfoReposity.save(userinfo);
			
			if(savedUser != null && save2 != null) {
				usersResponse.setUsersStatus(UsersStatus.ADD_SUCCESS);
				usersResponse.setMesg("註冊成功，請檢查電子郵件並完成驗證");
			}else {
				usersResponse.setUsersStatus(UsersStatus.ADD_FAILURE);
				usersResponse.setMesg("註冊失敗");
				
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
			
			if (!userDB.getIsVerified()) {
	            usersResponse.setUsersStatus(UsersStatus.LOGIN_FAILURE);
	            usersResponse.setMesg("Login Failure: 您的帳號尚未驗證");
	            usersResponse.setUsers(null);
	            return usersResponse;
	        }
			
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
	
	public UserAllInfo userAllInfo(Long userId) {
		
		List<Object[]> results = usersRepository.findByUserId(userId);
		Object[] result = results.get(0);
		UserAllInfo userAllInfo = new UserAllInfo(
				(Long)result[0],	  // userId
				(String) result[1],   // username
	            (String) result[2],   // email
	            (String) result[3],   // password
	            (String) result[4],   // phoneNumber
	            (String) result[5],   // firstName
	            (String) result[6],   // lastName
	            (String) result[7],   // address
	            (String) result[8],   // postalCode
	            (String) result[9],   // county
	            (String) result[10],  // district
	            (String) result[11],  // birthday
	            (boolean) result[12], //isDel
	            (boolean) result[13]);  //isVerified
		return userAllInfo;
		
	}
	
	public boolean updateUser(UserAllInfo userAllInfo) {
		Users users = new Users();
		Userinfo userinfo = new Userinfo();
//		System.out.println(userAllInfo.toString());
		users.setUserId(userAllInfo.getUserId());
		users.setPassword(userAllInfo.getPassword());
		users.setEmail(userAllInfo.getEmail());
		users.setPhoneNumber(userAllInfo.getPhoneNumber());
		users.setUsername(userAllInfo.getUsername());
		users.setDel(userAllInfo.getIsDel());
		users.setIsVerified(userAllInfo.getIsVerified());
		
		
		userinfo.setId(userAllInfo.getUserId());
		userinfo.setAddress(userAllInfo.getAddress());
		userinfo.setBirthday(userAllInfo.getBirthday());
		userinfo.setCounty(userAllInfo.getCounty());
		userinfo.setDistrict(userAllInfo.getDistrict());
		userinfo.setFirstName(userAllInfo.getFirstName());
		userinfo.setLastName(userAllInfo.getLastName());
		userinfo.setPostalCode(userAllInfo.getPostalCode());
		
		Users save = usersRepository.save(users);
		Userinfo save2 = usersInfoReposity.save(userinfo);
		if(save != null && save2 != null) {
			return true;
		}
		return false;
	}
	
	public int deleteUser(Long userId) {
		int del = usersRepository.updateUserByUserId(userId);
//		System.out.println("刪除帳號後的返回int" + del);
		
		return del;
	}
	
	public int updatePassword(String newPassword, Long userId) {
		return usersRepository.updatePasswordByUserId(BCrypt.hashpw(newPassword, BCrypt.gensalt()), userId);
	}
	
	// 活躍用戶數
	public long getActiveUserCount() {
        return usersRepository.countActiveUsers();
    }
	
	private static final String USER_ID_SESSION_ATTRIBUTE = "currentUserId";
	public Long getCurrentUserId() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(false);
        if (session != null) {
            Long userId = (Long) session.getAttribute(USER_ID_SESSION_ATTRIBUTE);
            return userId;
        }
        return null;
    }

	public boolean verifyToken(String token) {
	    List<Object[]> tokenUserList = usersRepository.findByToken(token);
	    
	    if (tokenUserList.isEmpty() || tokenUserList.size() == 0) {
	    	System.out.println("驗證失敗!!");
	        return false; // 驗證失敗，無效的 token
	    }
	    
	    Object[] result = tokenUserList.get(0);
	    Users tokenUser = new Users(
	    		(Long)result[0],	  // userId
				(String) result[1],   // username
	            (String) result[2],   // email
	            (String) result[3],   // password
	            (String) result[4],   // phoneNumber
	            (String) result[5],	  // token
	            (boolean) result[6],  //isDel
	            (boolean) result[7]  //isVerified
	    		);
	    
	    // 驗證成功，更新用戶狀態為已驗證
	    tokenUser.setToken(null);  // 清除 token，防止重複使用
	    tokenUser.setIsVerified(true);  // 將用戶狀態設為已驗證
	    usersRepository.save(tokenUser);
	    
	    return true; // 驗證成功
	}
}
