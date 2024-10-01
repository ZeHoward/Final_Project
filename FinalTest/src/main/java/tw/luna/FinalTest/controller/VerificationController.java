package tw.luna.FinalTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tw.luna.FinalTest.service.UsersServiceImpl;

@Controller
public class VerificationController {

	@Autowired
    private UsersServiceImpl usersServiceImpl;

	@GetMapping("/verify")
    public String verifyUser(@RequestParam("token") String token) {
        boolean isVerified = usersServiceImpl.verifyToken(token);
        if(isVerified) {
        	return "verifiedIsOK";
        }
        return "verifiedFail";
    }
	
}
