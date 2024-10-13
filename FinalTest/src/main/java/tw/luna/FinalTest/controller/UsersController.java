package tw.luna.FinalTest.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import jakarta.servlet.http.HttpSession;
import tw.luna.FinalTest.BCrypt;
import tw.luna.FinalTest.dto.UpdatePasswordDTO;
import tw.luna.FinalTest.dto.UserDTO;
import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.model.UsersResponse;
import tw.luna.FinalTest.model.UsersStatus;
import tw.luna.FinalTest.service.EmailCheckService;
import tw.luna.FinalTest.service.UsersServiceImpl;


@RequestMapping("/users")
@RestController
public class UsersController extends TextWebSocketHandler{
	
	@Autowired
	private UsersServiceImpl usersServiceImpl;
	
	@Autowired
	private EmailCheckService emailCheckService;
	
	@Autowired
	private HttpSession session;
	
	@PostMapping("/regist")
	public UsersResponse regist(@RequestBody UserAllInfo registUser) {
		return usersServiceImpl.registUsers(registUser);
	}
	
	@GetMapping("/checkEmail")
	public boolean checkEmail(@RequestParam String email) {
		if(usersServiceImpl.isExistUser(email).getUsers() != null) {
			return true;
		}
		return false;
	}
	
	
	@PostMapping("/login")     
	public UsersResponse login(@RequestBody Map<String, String> request) {
		System.out.println("loginSession:" + session);
		UsersResponse loginUsers = usersServiceImpl.loginUsers(request);
		
		if(loginUsers.getUsersStatus() == UsersStatus.LOGIN_SUCCESS && loginUsers.getMesg().equals("Login Success") ) {
			Long userId = loginUsers.getUsers().getUserId();
			UserAllInfo sessionUser = usersServiceImpl.userAllInfo(userId);
			session.setAttribute("loggedInUser", sessionUser);
//			System.out.println("創建JSESSIONID:" + session.getId());

			// 將用戶信息保存到 session 中
			session.setAttribute("loggedInUser", sessionUser);
		}
		return loginUsers;
	}
	
	@PostMapping("/googleLogin")
	public UsersResponse authenticate(@RequestBody Map<String, String> body) {
        String idToken = body.get("idToken");

        try {
            // 驗證 ID Token 並取得使用者資訊
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            UsersResponse googleUsersResponse = usersServiceImpl.googleLogin(decodedToken);
            if(googleUsersResponse.getUsersStatus() == UsersStatus.EXIST || googleUsersResponse.getUsersStatus() == UsersStatus.ADD_SUCCESS) {
            	Long userId = googleUsersResponse.getUsers().getUserId();
            	UserAllInfo sessionUser = usersServiceImpl.userAllInfoByGoogle(userId);
    			session.setAttribute("loggedInUser", sessionUser);
            }
            return googleUsersResponse;
        } catch (FirebaseAuthException e) {
        	UsersResponse usersResponse = new UsersResponse();
        	usersResponse.setUsersStatus(UsersStatus.LOGIN_FAILURE);
        	usersResponse.setMesg("Firebase獲取使用者訊失敗");
        	usersResponse.setUsers(null);
        	e.printStackTrace();
        	return usersResponse;
        }
		
    }
	
	@GetMapping("/logout")
	public boolean logout() {
		UserAllInfo loggedInUser = (UserAllInfo) session.getAttribute("loggedInUser");
		if( loggedInUser != null) {
			session.invalidate();
			return true;
		}
		return false;
	}
	
	@GetMapping("/userAllInfo")
	public UserAllInfo userAllInfo() {
		UserAllInfo loggedInUser = (UserAllInfo)session.getAttribute("loggedInUser");
		if(loggedInUser != null) {
			Long userId = loggedInUser.getUserId();
			if(loggedInUser.getAuthType().equals("email")) {
				UserAllInfo newUserAllInfo = usersServiceImpl.userAllInfo(userId);
				session.setAttribute("loggedInUser", newUserAllInfo);
				return newUserAllInfo;
			}else {
				UserAllInfo userAllInfoByGoogle = usersServiceImpl.userAllInfoByGoogle(userId);
				return userAllInfoByGoogle;
			}
		}
		return null;
	}
	
	@PostMapping("/update")
	public boolean update(@RequestBody UserAllInfo updateUser) {
		
		UserAllInfo loggedInUser = (UserAllInfo)session.getAttribute("loggedInUser");
		updateUser.setPassword(loggedInUser.getPassword());
		updateUser.setIsDel(loggedInUser.getIsDel());
		updateUser.setIsVerified(loggedInUser.getIsVerified());
		updateUser.setAuthType(loggedInUser.getAuthType());
		return usersServiceImpl.updateUser(updateUser);
	}
	
	@GetMapping("/deleteUser")
	public int deleteUser() {
		UserAllInfo loggedInUser = (UserAllInfo)session.getAttribute("loggedInUser");
		int del = usersServiceImpl.deleteUser(loggedInUser.getUserId());
		session.invalidate();
		return del;
	}
	
	
	@PostMapping("/updatePassword")
	public int updatePassword(@RequestBody UpdatePasswordDTO updataPassword) {
		UserAllInfo loggedInUser = (UserAllInfo)session.getAttribute("loggedInUser");
		if(BCrypt.checkpw(updataPassword.getOldPassword(), loggedInUser.getPassword())) {
			return usersServiceImpl.updatePassword(updataPassword.getNewPassword(), loggedInUser.getUserId());
		}else {
			return 2;
		}
	}
	
	@GetMapping("/checkSession")
	public boolean checkSession() {
//		System.out.println("進入checkSession:");
		UserAllInfo loggedInUser = (UserAllInfo)session.getAttribute("loggedInUser");
		if(loggedInUser != null) {
//			System.out.println(loggedInUser.toString());
			return true;
		}
		return false;
	}
	
	// 返回 isDel = 0 的用戶總數
	@GetMapping("/count-active")
	public long getActiveUserCount() {
	    return usersServiceImpl.getActiveUserCount();
	}
	

	@GetMapping
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = usersServiceImpl.getAllUsers();
        return ResponseEntity.ok(users);
    }

	@PostMapping("/forgetPassword")
	public boolean forgetPassword(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String birthday = request.get("birthday");
		return usersServiceImpl.getUserByEmailAndBirthday(email, birthday);
	}
	
	@PostMapping("/resetPassword")
	public int resetPassword(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String password = request.get("newPassword");
		return usersServiceImpl.resetPasswordByEmail(email, password);
		
	}
	
	@GetMapping("/revalidate")
	public UsersStatus revalidate(@RequestParam String email) {
		return usersServiceImpl.revalidate(email);
	}
	
	@PostMapping("/consult")
	public void consult(@RequestBody Map<String, String> request) {
		emailCheckService.sendToSeller(request);
	}
	
	
	@GetMapping("/webSocket")
	public void webSocket() {
		
	}
	
	
	
}
