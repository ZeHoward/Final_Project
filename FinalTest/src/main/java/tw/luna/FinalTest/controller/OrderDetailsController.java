package tw.luna.FinalTest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tw.luna.FinalTest.model.OrderDetails;
import tw.luna.FinalTest.service.OrderDetailsService;

@RestController
@RequestMapping("/api/orderdetails")
public class OrderDetailsController {

	@Autowired
	private OrderDetailsService orderDetailsService;

	// 獲取所有訂單詳細
	@GetMapping
	public List<OrderDetails> getAllOrderDetails() {
		return orderDetailsService.getAllOrderDetails();
	}

	// 根據 ID 獲取單個訂單詳細
	@GetMapping("/{id}")
	public ResponseEntity<OrderDetails> getOrderDetailsById(@PathVariable Integer id) {
		Optional<OrderDetails> orderDetails = orderDetailsService.getOrderDetailsById(id);
		return orderDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// 分頁查詢訂單詳細
	@GetMapping("/page")
	public Page<OrderDetails> getOrderDetailsWithPagination(Pageable pageable) {
		return orderDetailsService.getOrderDetailsWithPagination(pageable);
	}

	// 創建新的訂單詳細
	@PostMapping
	public OrderDetails createOrderDetails(@RequestBody OrderDetails orderDetails) {
		return orderDetailsService.createOrderDetails(orderDetails);
	}

	// 更新訂單詳細
	@PutMapping("/{id}")
	public ResponseEntity<OrderDetails> updateOrderDetails(@PathVariable Integer id,
			@RequestBody OrderDetails orderDetails) {
		return orderDetailsService.updateOrderDetails(id, orderDetails);
	}

	// 刪除訂單詳細
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteOrderDetails(@PathVariable Integer id) {
		return orderDetailsService.deleteOrderDetails(id);
	}
}
