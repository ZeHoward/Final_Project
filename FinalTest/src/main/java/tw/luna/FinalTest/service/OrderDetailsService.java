package tw.luna.FinalTest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import tw.luna.FinalTest.model.OrderDetails;
import tw.luna.FinalTest.repository.OrderDetailsRepository;

@Service
public class OrderDetailsService {

	@Autowired
	private OrderDetailsRepository orderDetailsRepository;

	// 獲取所有訂單詳細
	public List<OrderDetails> getAllOrderDetails() {
		return orderDetailsRepository.findAll();
	}

	// 根據 ID 獲取單個訂單詳細
	public Optional<OrderDetails> getOrderDetailsById(Integer id) {
		return orderDetailsRepository.findById(id);
	}

	// 創建新的訂單詳細
	public OrderDetails createOrderDetails(OrderDetails orderDetails) {
		return orderDetailsRepository.save(orderDetails);
	}

	// 更新訂單詳細
	public ResponseEntity<OrderDetails> updateOrderDetails(Integer id, OrderDetails orderDetailsDetails) {
		Optional<OrderDetails> optionalOrderDetails = orderDetailsRepository.findById(id);
		if (optionalOrderDetails.isPresent()) {
			OrderDetails existingOrderDetails = optionalOrderDetails.get();
			existingOrderDetails.setQuantity(orderDetailsDetails.getQuantity());
			existingOrderDetails.setPrice(orderDetailsDetails.getPrice());
			existingOrderDetails.setOrder(orderDetailsDetails.getOrder());
			existingOrderDetails.setProduct(orderDetailsDetails.getProduct());
			OrderDetails updatedOrderDetails = orderDetailsRepository.save(existingOrderDetails);
			return ResponseEntity.ok(updatedOrderDetails);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 刪除訂單詳細
	public ResponseEntity<Void> deleteOrderDetails(Integer id) {
		Optional<OrderDetails> optionalOrderDetails = orderDetailsRepository.findById(id);
		if (optionalOrderDetails.isPresent()) {
			orderDetailsRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 分頁查詢訂單詳細
	public Page<OrderDetails> getOrderDetailsWithPagination(Pageable pageable) {
		return orderDetailsRepository.findAll(pageable);
	}
}
