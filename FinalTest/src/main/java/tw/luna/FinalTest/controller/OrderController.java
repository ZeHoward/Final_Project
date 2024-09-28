package tw.luna.FinalTest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import tw.luna.FinalTest.dto.OrderWithUserDTO;
import tw.luna.FinalTest.model.Order;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@Autowired
    private PagedResourcesAssembler<Order> pagedResourcesAssembler;

	// 獲取所有訂單
	@GetMapping
	public List<Order> getAllOrders(HttpSession session) {
		
		//session測試
		Users user = (Users)session.getAttribute("user");
		System.out.println("getAllOrders,userEmail : " + user.getEmail());
		System.out.println("getAllOrders,userPassword : " + user.getPassword());
		System.out.println("getAllOrders,userId : " + user.getUserId());
		
		
		//
		return orderService.getAllOrders();
	}

	// 根據 ID 獲取單個訂單
	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable Integer id) {
	    return orderService.getOrderById(id); // 直接調用服務層
	}
	
	@GetMapping("/page")
	public ResponseEntity<Page<OrderWithUserDTO>> getOrdersWithPagination(
	    @RequestParam("page") int page,
	    @RequestParam("size") int size,
	    @RequestParam("sortField") String sortField, // 排序字段
	    @RequestParam("sortDirection") String sortDirection // 排序方向 ("asc" 或 "desc")
	) {
	    return orderService.getOrdersWithPagination(page, size, sortField, sortDirection);
	}

//	// 創建新訂單
//	@PostMapping("/add")
//	public Order createOrder(@RequestBody Order order) {
//		return orderService.createOrder(order);
//	}
//	
//	@PostMapping("/checkout")
//    public ResponseEntity<Order> checkout(@RequestParam Integer cartId, @RequestParam String address) {
//        Order order = orderService.createOrderFromCart(cartId, address);
//        return ResponseEntity.ok(order);
//    }
	
//
//	// 刪除訂單
//	@DeleteMapping("/{id}")
//	public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
//		return orderService.deleteOrder(id);
//	}
}
