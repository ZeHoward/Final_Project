package tw.luna.FinalTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.model.UsersResponse;
import tw.luna.FinalTest.service.UsersServiceImpl;


@RequestMapping("/users")
@RestController
public class UsersController {
	
	@Autowired
	private UsersServiceImpl usersServiceImpl; 
	
	
	
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
	public UsersResponse login(@RequestBody Users users, HttpSession session) {
		UsersResponse loginUsers = usersServiceImpl.loginUsers(users);
			
		System.out.println(session.getId());
		session.setAttribute("aaa", "AAA");
		
		return loginUsers;
	}
	
	
	@GetMapping("/userAllInfo")
	public UserAllInfo userAllInfo(@RequestParam String email) {
		return usersServiceImpl.userAllInfo(email);
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
