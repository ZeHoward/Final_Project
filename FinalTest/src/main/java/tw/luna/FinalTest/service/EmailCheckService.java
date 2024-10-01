 package tw.luna.FinalTest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailCheckService {
	@Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            
            String htmlContent = "<html lang=\"zh-Hant\"><head><meta charset=\"UTF-8\">" +
                    "<style>body {font-family: Arial, sans-serif;background-color: #f4f4f4;margin: 0;padding: 0;}" +
                    ".container {background-color: #ffffff;padding: 20px;margin: 0 auto;max-width: 600px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);border-radius: 8px;text-align: center;}" +
                    "h1 {color: #4CAF50;} p {font-size: 18px;color: #333333;line-height: 1.6;} .btn {display: inline-block;margin-top: 20px;padding: 12px 24px;background-color: #4CAF50;color: white;text-decoration: none;font-size: 18px;border-radius: 5px;} .btn:hover {background-color: #45a049;}" +
                    ".footer {margin-top: 30px;font-size: 14px;color: #888888;}</style></head><body><div class=\"container\">" +
                    "<h1>驗證您的電子郵件</h1><p>親愛的用戶，</p><p>感謝您註冊我們的服務！請點擊下面的按鈕來驗證您的電子郵件地址並啟用您的帳戶：</p>" +
                    "<a href=\"http://localhost:8080/verify?token=" + token + "\" class=\"btn\">驗證電子郵件</a><p>如果您沒有註冊過我們的服務，請忽略此郵件。</p>" +
                    "<div class=\"footer\"><p>此郵件由系統自動發送，請勿回覆。</p><p>© 2024 您的公司名稱. 保留所有權利。</p></div></div></body></html>";

            helper.setTo(to);
            helper.setFrom("haurd8080@gmail.com");
            helper.setSubject("請驗證您的信箱");
            helper.setText(htmlContent, true);            
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
