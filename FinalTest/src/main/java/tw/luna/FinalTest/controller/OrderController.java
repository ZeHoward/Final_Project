package tw.luna.FinalTest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tw.luna.FinalTest.model.Order;
import tw.luna.FinalTest.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	// 獲取所有訂單
	@GetMapping
	public List<Order> getAllOrders() {
		return orderService.getAllOrders();
	}

	// 根據 ID 獲取單個訂單
	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable Integer id) {
		Order order = orderService.getOrderById(id); // 調用服務層獲取訂單

		if (order != null) {
			// 找到訂單，返回 200 OK 和訂單信息
			return ResponseEntity.ok(order);
		} else {
			// 未找到訂單，返回 404 Not Found
			return ResponseEntity.notFound().build();
		}
	}

	// 創建新訂單
	@PostMapping("/add")
	public Order createOrder(@RequestBody Order order) {
		return orderService.createOrder(order);
	}

	// 刪除訂單
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
		return orderService.deleteOrder(id);
	}
}
