package tw.luna.FinalTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import tw.luna.FinalTest.service.OrdersService;
@Controller
public class PageController {
	
	@Autowired
    private OrdersService ordersService;
	
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
	@GetMapping("/myOrderList")
    public String myOrderList(Model model) {
        return "orderManage"; // ordersService.getOrdersList(model);
    }

	@GetMapping("shoppingCart")
	public String shoppingCart() {
		return "shoppingCart";
	}
	@GetMapping("recipe")
	public String recipe() {
		return "recipe";
	}
	@GetMapping("recipeDetails")
	public String recipeDetails() {
		return "recipeDetails";
	}
	@GetMapping("checkout")
	public String checkout() {
		return "checkout";
	}
	@GetMapping("checkInfo")
	public String checkInfo() {
		return "checkInfo";
	}

    @GetMapping("/myOrder/details/{id}")
    public String myOrderDetails(@PathVariable Integer id, Model model) {
    	return "checkOrder";
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
