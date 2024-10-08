package tw.luna.FinalTest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import tw.luna.FinalTest.model.Users;

@Aspect
@Component
public class EnjoyumAspectLog {

//	@Before("execution(* tw.luna.FinalTest.controller.UsersController.login(..))")
//	public void beforeLogin(ProceedingJoinPoint joinPoint) {
//		System.out.println("aspectLogBeforeLogin");
//	}
	
	private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
	
	@Before("execution(* tw.luna.FinalTest.controller.UsersController.login(..))")
	public void beforeLogin(JoinPoint joinPoint) {
		Object[] args = joinPoint.getArgs();
		Users users = (Users) args[0];

		//獲取發送請求端的ip
		ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		String clientIpAddress = "" ;
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            clientIpAddress = getClientIp(request);
            //System.out.println("Client IP: " + clientIpAddress);
        }
		
        //將要紀錄的訊息寫到本地的loning.txt
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss.SSS");
			Date date = new Date();
			String time =  sdf.format(date);
						
			File file = new File("log/login.txt");
			BufferedWriter br = new BufferedWriter(new FileWriter(file, true));
			br.write(time + "，發送請求的IP : " + clientIpAddress + "，輸入帳號：" + users.getEmail() + "\n");
			br.flush();
			br.close();
			
		}catch(Exception e) {
			System.out.println(e);
		}
	}

}
