package tw.luna.FinalTest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import jakarta.servlet.http.HttpServletRequest;
import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.model.UsersResponse;
import tw.luna.FinalTest.model.UsersStatus;

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
		Map<String, String> users = (Map) args[0];

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
						
			File file = new File("log/enjoyumLog.txt");
			BufferedWriter br = new BufferedWriter(new FileWriter(file, true));
			br.write(time + "，發送請求的IP : " + clientIpAddress + "，登入帳號：" + users.get("email") + "\n");
			br.flush();
			br.close();
			
		}catch(Exception e) {
			System.out.println(e);
		}
	}
	
	@Before("execution(* tw.luna.FinalTest.controller.UsersController.authenticate(..))")
	public void beforeGoogleLogin(JoinPoint joinPoint) {
		Object[] args = joinPoint.getArgs();
		Map<String, String> googleMap = (Map)args[0];
        String idToken = googleMap.get("idToken");
        FirebaseToken decodedToken;
        //獲取發送請求端的ip
  		ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
  		String clientIpAddress = "" ;
          if (attributes != null) {
              HttpServletRequest request = attributes.getRequest();
              clientIpAddress = getClientIp(request);
              //System.out.println("Client IP: " + clientIpAddress);
          }
		try {
			decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
			String email = decodedToken.getEmail();
			String name = decodedToken.getName();
			
			SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss.SSS");
			Date date = new Date();
			String time =  sdf.format(date);
						
			File file = new File("log/enjoyumLog.txt");
			BufferedWriter br = new BufferedWriter(new FileWriter(file, true));
			br.write(time + "，發送請求的IP : " + clientIpAddress + "，第三方google登入：" + email + "\n");
			br.flush();
			br.close();
			
		} catch (Exception e) {
			System.out.println(e);		
		}

	}
	
	
	@Before("execution(* tw.luna.FinalTest.controller.UsersController.regist(..))")
	public void beforeRegist(JoinPoint joinPoint) {
		Object[] args = joinPoint.getArgs();
		UserAllInfo registUser = (UserAllInfo)args[0];
		String email = registUser.getEmail();
		
		//獲取發送請求端的ip
		ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		String clientIpAddress = "" ;
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            clientIpAddress = getClientIp(request);
            //System.out.println("Client IP: " + clientIpAddress);
        }
        
      //將要紀錄的訊息寫到本地的enjoyumLog.txt
  		try {
  			SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss.SSS");
  			Date date = new Date();
  			String time =  sdf.format(date);
  						
  			File file = new File("log/enjoyumLog.txt");
  			BufferedWriter br = new BufferedWriter(new FileWriter(file, true));
  			br.write(time + "，發送請求的IP : " + clientIpAddress + "，註冊帳號：" + email + "\n");
  			br.flush();
  			br.close();
  			
  		}catch(Exception e) {
  			System.out.println(e);
  		}
		
	}
	/*
	@AfterReturning(value = "execution(* tw.luna.FinalTest.controller.UsersController.regist(..))", returning = "result")
	public void afterRegist(JoinPoint joinPoint, Object result) {
		UsersResponse registResult = (UsersResponse)result;
		UsersStatus status = registResult.getUsersStatus();
		String email = registResult.getUsers().getEmail();
		Long userId = registResult.getUsers().getUserId();
		
		//獲取發送請求端的ip
		ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		String clientIpAddress = "" ;
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            clientIpAddress = getClientIp(request);
            //System.out.println("Client IP: " + clientIpAddress);
        }
      */
}
