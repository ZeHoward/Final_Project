package tw.luna.FinalTest.controller;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import tw.luna.FinalTest.dto.OrderWithUserDTO;
import tw.luna.FinalTest.dto.orders.OrdersInsertDto;
import tw.luna.FinalTest.model.Orders;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.service.OrdersService;


@RequestMapping("/api/orders")
@RestController
public class OrdersController {
    Long userId = 1L; // 假設用戶 ID 固定為 1，實際情況應根據需求調整

    @Autowired
    OrdersService ordersService;

    // 提交購物車商品->訂單
    @PostMapping ("/{userId}")
    public ResponseEntity<String> addToOrders(@RequestBody OrdersInsertDto ordersInsertDto, @PathVariable Long userId) {
        ordersService.insertOrder(ordersInsertDto,userId);
        return ResponseEntity.ok("成功新增訂單");
    }
    
 // 獲取所有訂單
 	@GetMapping
 	public List<Orders> getAllOrders(HttpSession session) {
 		
 		//session測試
 		Users user = (Users)session.getAttribute("user");
 		System.out.println("getAllOrders,userEmail : " + user.getEmail());
 		System.out.println("getAllOrders,userPassword : " + user.getPassword());
 		System.out.println("getAllOrders,userId : " + user.getUserId());
 		
 		
 		//
 		return ordersService.getAllOrders();
 	}

 	// 根據 ID 獲取單個訂單
 	@GetMapping("/{id}")
 	public ResponseEntity<Orders> getOrderById(@PathVariable Integer id) {
 	    return ordersService.getOrderById(id); // 直接調用服務層
 	}
 	
 	@GetMapping("/page")
 	public ResponseEntity<Page<OrderWithUserDTO>> getOrdersWithPagination(
 	    @RequestParam("page") int page,
 	    @RequestParam("size") int size,
 	    @RequestParam("sortField") String sortField, // 排序字段
 	    @RequestParam("sortDirection") String sortDirection // 排序方向 ("asc" 或 "desc")
 	) {
 	    return ordersService.getOrdersWithPagination(page, size, sortField, sortDirection);
 	}

// 	// 創建新訂單
// 	@PostMapping("/add")
// 	public Order createOrder(@RequestBody Order order) {
// 		return orderService.createOrder(order);
// 	}
 //	
// 	@PostMapping("/checkout")
//     public ResponseEntity<Order> checkout(@RequestParam Integer cartId, @RequestParam String address) {
//         Order order = orderService.createOrderFromCart(cartId, address);
//         return ResponseEntity.ok(order);
//     }
 	
 //
// 	// 刪除訂單
// 	@DeleteMapping("/{id}")
// 	public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
// 		return orderService.deleteOrder(id);
// 	}
    
 	@GetMapping("/overview")
 	public ResponseEntity<Map<String, Integer>> getOverviewData(
 	    @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
 	    @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
 	) {
 	    // 從 service 層獲取營業額總和
 	    Integer totalRevenue = ordersService.getTotalRevenue(startDate, endDate);

 	    // 從 service 層獲取訂單總數
 	    Integer totalOrders = ordersService.getTotalOrders(startDate, endDate);

 	    // 創建一個 Map 來存儲返回的數據
 	    Map<String, Integer> overviewData = new HashMap<>();
 	    overviewData.put("totalRevenue", totalRevenue);
 	    overviewData.put("totalOrders", totalOrders);

 	    // 返回 Map 結構的數據
 	    return ResponseEntity.ok(overviewData);
 	}

}
