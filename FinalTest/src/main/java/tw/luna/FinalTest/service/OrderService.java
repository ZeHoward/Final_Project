package tw.luna.FinalTest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import tw.luna.FinalTest.model.Order;
import tw.luna.FinalTest.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	// 獲取所有訂單
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	// 獲取分頁訂單
	public Page<Order> getOrdersWithPagination(Pageable pageable) {
		return orderRepository.findAll(pageable); // 使用 Spring Data JPA 的內建方法來進行分頁查詢
	}

	// 根據 ID 獲取單個訂單
	public Order getOrderById(Integer id) {
		return orderRepository.findById(id).orElse(null); // 如果未找到，返回 null
	}

	// 創建新訂單
	public Order createOrder(Order order) {
		return orderRepository.save(order);
	}

	// 刪除訂單
	public ResponseEntity<Void> deleteOrder(Integer id) {
		Optional<Order> optionalOrder = orderRepository.findById(id);

		if (optionalOrder.isPresent()) {
			orderRepository.delete(optionalOrder.get());
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
