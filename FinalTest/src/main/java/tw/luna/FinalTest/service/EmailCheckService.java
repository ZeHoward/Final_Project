 package tw.luna.FinalTest.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import tw.luna.FinalTest.repository.UsersRepository;

@Service
public class EmailCheckService {
	@Autowired
    private JavaMailSender mailSender;
	
	@Autowired
	private UsersRepository usersRepository;
	
	

    public void sendVerificationEmail(String to, String token) {
        try {
        	MimeMessage message = mailSender.createMimeMessage();
        	MimeMessageHelper helper = new MimeMessageHelper(message, true);
            /*
            String htmlContent = "<html lang=\"zh-Hant\"><head><meta charset=\"UTF-8\">" +
                    "<style>body {font-family: Arial, sans-serif;background-color: #f4f4f4;margin: 0;padding: 0;}" +
                    ".container {background-color: #ffffff;padding: 20px;margin: 0 auto;max-width: 600px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);border-radius: 8px;text-align: center;}" +
                    "h1 {color: #4CAF50;} p {font-size: 18px;color: #333333;line-height: 1.6;} .btn {display: inline-block;margin-top: 20px;padding: 12px 24px;background-color: #4CAF50;color: white;text-decoration: none;font-size: 18px;border-radius: 5px;} .btn:hover {background-color: #45a049;}" +
                    ".footer {margin-top: 30px;font-size: 14px;color: #888888;}</style></head><body><div class=\"container\">" +
                    "<h1>驗證您的電子郵件</h1><p>親愛的用戶，</p><p>感謝您註冊我們的服務！請點擊下面的按鈕來驗證您的電子郵件地址並啟用您的帳戶：</p>" +
                    "<a href=\"http://localhost:8080/verify?token=" + token + "\" class=\"btn\">驗證電子郵件</a><p>如果您沒有註冊過我們的服務，請忽略此郵件。</p>" +
                    "<div class=\"footer\"><p>此郵件由系統自動發送，請勿回覆。</p><p>© 2024 您的公司名稱. 保留所有權利。</p></div></div></body></html>";
*/
        	String htmlContent = "<html lang=\"zh-Hant\">\n" +
                    "    <head>\n" +
                    "        <meta charset=\"UTF-8\">\n" +
                    "        <style>\n" +
                    "            body {\n" +
                    "                font-family: Arial, sans-serif;\n" +
                    "                background-color: #f4f4f4;\n" +
                    "                margin: 0;\n" +
                    "                padding: 0;\n" +
                    "            }\n" +
                    "            .container {\n" +
                    "                background-image: url('https://i.imgur.com/sF0D95G.gif');\n" +
                    "                background-size: cover;\n" +
                    "                background-position: center;\n" +
                    "                padding: 20px;\n" +
                    "                margin: 0 auto;\n" +
                    "                width: 648px;\n" +
                    "                height: 648px;\n" +
                    "                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n" +
                    "                border-radius: 8px;\n" +
                    "                text-align: center;\n" +
                    "            }\n" +
                    "            #key{\n" +
                    "              color: #e0912f;\n" +
                    "              font-style: normal;\n" +
                    "              font-size: 20px;\n" +
                    "              font-weight: bolder;\n" +
                    "              text-decoration: none;\n" +
                    "            }\n" +
                    "            #key:hover{\n" +
                    "                color: #d35b50;\n" +
                    "            }\n" +
                    "        </style>\n" +
                    "    </head>\n" +
                    "    <body>\n" +
                    "        <div class=\"container\">\n <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>" +
                    "            <a id=\"key\" href=\"http://localhost:8080/verify?token=" + token + "\">驗證電子信箱</a>\n" +
                    "        </div>\n" +
                    "    </body>\n" +
                    "</html>";

            helper.setTo(to);
            helper.setFrom("haurd8080@gmail.com");
            helper.setSubject("請驗證您的信箱");
            helper.setText(htmlContent, true);            
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendForgetPasswordEmail(String to) {
	
	try {
		MimeMessage message = mailSender.createMimeMessage();
    	MimeMessageHelper helper = new MimeMessageHelper(message, true);
    	String forgetPasswordUrl = "http://localhost:8080/resetPassword";
//    	String htmlContent = "<p>您好，</p>" +
//                "<p>我們收到了您重設密碼的請求。</p>" +
//                "<p>點擊以下連結重設您的密碼：</p>" +
//                "<p><a href=\"" + forgetPasswordUrl + "?email=" + to + "\">重設密碼</a></p>" +
//                "<br>" +
//                "<p>如果您並未請求重設密碼，請忽略此郵件。</p>";
    	String htmlContent = "<div style=\"font-family: Arial, sans-serif; color: #333333; padding: 20px;\">" +
    	        "<h2 style=\"color: #E0912F; text-align: center;\">重設您的密碼</h2>" +
    	        "<p>您好，</p>" +
    	        "<p>我們收到了您重設密碼的請求。請點擊下面的按鈕來重設您的密碼：</p>" +
    	        "<div style=\"text-align: center; margin: 20px 0;\">" +
    	        "  <a href=\"" + forgetPasswordUrl + "?email=" + to + "\" " +
    	        "     style=\"display: inline-block; padding: 12px 24px; background-color: #E0912F; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 5px;\">" +
    	        "    重設密碼" +
    	        "  </a>" +
    	        "</div>" +
    	        "<p>如果您並未請求重設密碼，請忽略此郵件。</p>" +
    	        "<p style=\"font-size: 12px; color: #888888;\">此郵件由系統自動發送，請勿回覆。</p>" +
    	        "</div>";

    			
    	helper.setTo(to);
        helper.setFrom("haurd8080@gmail.com");
        helper.setSubject("請重設您的密碼");
        helper.setText(htmlContent, true);
        mailSender.send(message);
    	
	} catch (MessagingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

  }
    
    public void sendToSeller(Map<String, String> request) {
    	MimeMessage message = mailSender.createMimeMessage();
    	try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
			
			String htmlContent = "<html>" +
			        "<body>" +
			        "<h3>使用者諮詢通知</h3>" +
			        "<p><strong>姓名:</strong> " + request.get("name") + "</p>" +
			        "<p><strong>聯絡方式:</strong> " + request.get("contactInfo") + "</p>" +
			        "<p><strong>問題類型:</strong> " + request.get("questionType") + "</p>" +
			        "<p><strong>訊息內容:</strong> " + request.get("message") + "</p>" +
			        "<br><p>此信件為自動生成，請勿回覆。</p>" +
			        "</body>" +
			        "</html>";
			
			helper.setTo("haurd8080@gmail.com");
	        helper.setFrom("haurd8080@gmail.com");
	        helper.setSubject("使用者諮詢通知");
	        helper.setText(htmlContent, true);
	        mailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
    }

}
