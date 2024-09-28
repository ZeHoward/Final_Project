package tw.luna.FinalTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
	
	
	
	@RequestMapping("/regist")
	public UsersResponse regist(@RequestBody Users users) {
		return usersServiceImpl.registUsers(users);
	}
	
	@GetMapping("/checkEmail")
	public boolean checkEmail(@RequestParam String email) {
		if(usersServiceImpl.isExistUser(email).getUsers() != null) {
			return true;
		}
		return false;
	}
	
	
	@RequestMapping("/login")
	public UsersResponse login(@RequestBody Users users) {
		UsersResponse loginUsers = usersServiceImpl.loginUsers(users);
		if(loginUsers.getUsersStatus() == UsersStatus.LOGIN_SUCCESS) {
			Users sessionUser = loginUsers.getUsers();
			session.setAttribute("loggedInUser", sessionUser);
//			System.out.println("創建JSESSIONID:" + session.getId());
		}
		return loginUsers;
	}
	
	@GetMapping("/logout")
	public boolean logout() {
		Users loggedInUser = (Users) session.getAttribute("loggedInUser");
		if( loggedInUser != null) {
			session.invalidate();
			return true;
		}
		return false;
	}
	
	@GetMapping("/userAllInfo")
	public UserAllInfo userAllInfo() {
		Users loggedInUser = (Users)session.getAttribute("loggedInUser");
		return usersServiceImpl.userAllInfo(loggedInUser.getEmail());
	}
	
	@RequestMapping("/update")
	public void update(@RequestBody UserAllInfo userAllInfo) {
		usersServiceImpl.updateUser(userAllInfo);
	}
	
	@GetMapping("/checkSession")
	public void checkSession(HttpSession session) {
		System.out.println("進入checkSession");
		System.out.println((String) session.getAttribute("aaa"));
	}
	
	
	
	
	
}
