package tw.luna.FinalTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;
@Controller
public class PageController {
	
	
	@GetMapping("/")
    public String index() {
        return "index";  // 返回的是模板文件的名稱，不包括路徑和副檔名
    }
	
	@GetMapping("/about")
	public String aboutPage() {
	    return "about";  // 返回 templates 目錄下的 about.html
	}

	@GetMapping("/productList")
	public String productList() {
		return "productList";
	}
	@GetMapping("/enjoyum")
	public String enjoyum() {
		return "enjoyum";
	}
	@GetMapping("/detail")
	public String detail() {
		return "detail";
	}
	@GetMapping("/myCollection")
	public String myCollection() {
		return "myCollection";
	}
	@GetMapping("/myOrder/detail")
	public String myOrder() {
		return "checkOrder";
	}
	@GetMapping("/myOrderList")
	public String myOrderList() {
		return "orderManage";
	}
	
	//////////////////////////////////////////
	@GetMapping("/registPage")
	public String registPage() {
		return "registPage";
	}
	
	@GetMapping("/loginPage")
	public String loginPage() {
		return "loginPage";
	}

	@GetMapping("/memberCenterPage")
	public String memberCenterPage() {
		return "memberCenterPage";
	}
	
	@GetMapping("/memberBasicInfoPage")
	public String memberBasicInfoPage() {
		return "memberBasicInfoPage";
	}
	
	@GetMapping("/updatePasswordPage")
	public String updatePasswordPage() {
		return "updatePasswordPage";
	}
	
	@GetMapping("/couponPage")
	public String couponPage() {
		return "couponPage";
	}
}
