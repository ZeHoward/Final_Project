package tw.howard.final_project;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import tw.final_project.panjay.model.Users;
import tw.final_project.panjay.model.UsersResponse;
import tw.final_project.panjay.service.UsersServiceImpl;

@SpringBootTest
class FinalApplicationTests {

	@Autowired
	private UsersServiceImpl usersServiceImpl;
	
	@Test
	void contextLoads() {
	}
	
	@Test
	public void loningTest() {
		
		Users users = new Users();
		users.setEmail("jay66347@gmail.com");
		users.setPassword("hanasakuiroha1228");
		
		UsersResponse loginUsers = usersServiceImpl.loginUsers(users);
		System.out.println(loginUsers.toString());
	}

}
