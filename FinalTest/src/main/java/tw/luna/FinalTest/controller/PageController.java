package tw.luna.FinalTest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
	public String product() {
		return "product";
	}
	@GetMapping("/enjoyum")
	public String enjoyum() {
		return "enjoyum";
	}
	@GetMapping("/productList/detail")
	public String detail() {
		return "detail";
	}
}
