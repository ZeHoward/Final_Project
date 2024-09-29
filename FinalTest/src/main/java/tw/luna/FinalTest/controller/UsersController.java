package tw.luna.FinalTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import tw.luna.FinalTest.BCrypt;
import tw.luna.FinalTest.dto.UpdatePasswordDTO;
import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.model.UsersResponse;
import tw.luna.FinalTest.model.UsersStatus;
import tw.luna.FinalTest.service.UsersServiceImpl;


@RequestMapping("/users")
@RestController
public class UsersController {
	
	@Autowired
	private UsersServiceImpl usersServiceImpl;
	
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
	public UsersResponse login(@RequestBody Users users) {
		UsersResponse loginUsers = usersServiceImpl.loginUsers(users);
		if(loginUsers.getUsersStatus() == UsersStatus.LOGIN_SUCCESS) {
			Long userId = loginUsers.getUsers().getUserId();
			UserAllInfo sessionUser = usersServiceImpl.userAllInfo(userId);
			session.setAttribute("loggedInUser", sessionUser);
//			System.out.println("創建JSESSIONID:" + session.getId());
		}
		return loginUsers;
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
		
		return loggedInUser;
	}
	
	@PostMapping("/update")
	public void update(@RequestBody UserAllInfo updateUser) {
		UserAllInfo loggedInUser = (UserAllInfo)session.getAttribute("loggedInUser");
		updateUser.setPassword(loggedInUser.getPassword());
		usersServiceImpl.updateUser(updateUser);
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
	
	
	
	
	
}
