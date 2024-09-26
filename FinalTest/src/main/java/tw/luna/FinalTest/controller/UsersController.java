package tw.luna.FinalTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.model.UsersResponse;
import tw.luna.FinalTest.service.UsersServiceImpl;


@RequestMapping("/users")
@RestController
public class UsersController {
	
	@Autowired
	private UsersServiceImpl usersServiceImpl; 
	
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@RequestMapping("/regist")
	public UsersResponse regist(@RequestBody Users users) {
		return usersServiceImpl.registUsers(users);
	}
	
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@GetMapping("/checkEmail")
	public boolean checkEmail(@RequestParam String email) {
		
		if(usersServiceImpl.isExistUser(email).getUsers() != null) {
			return true;
		}
		return false;
	}
	
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@RequestMapping("/login")
	public UsersResponse login(@RequestBody Users users) {
		UsersResponse loginUsers = usersServiceImpl.loginUsers(users);
		return loginUsers;
	}
	
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@GetMapping("/userAllInfo")
	public UserAllInfo userAllInfo(@RequestParam String email) {
		return usersServiceImpl.userAllInfo(email);
	}
	
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@RequestMapping("/update")
	public void update(@RequestBody UserAllInfo userAllInfo) {
		usersServiceImpl.updateUser(userAllInfo);
	}
	
	
	
	
}
