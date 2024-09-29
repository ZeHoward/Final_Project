package tw.luna.FinalTest.service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import tw.luna.FinalTest.dto.OrderDetailsDTO;
import tw.luna.FinalTest.model.OrderDetails;
import tw.luna.FinalTest.model.Product;
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
	public ResponseEntity<OrderDetailsDTO> updateOrderDetails(Integer id, OrderDetailsDTO orderDetailsDTO) {
	    Optional<OrderDetails> optionalOrderDetails = orderDetailsRepository.findById(id);
	    
	    if (optionalOrderDetails.isPresent()) {
	        OrderDetails existingOrderDetails = optionalOrderDetails.get();

	        // 更新訂單詳情的字段
	        existingOrderDetails.setQuantity(orderDetailsDTO.getQuantity());
	        existingOrderDetails.setPrice(orderDetailsDTO.getPrice());

	        // 更新產品 ID，如果存在
	        if (orderDetailsDTO.getProductId() != null) {
	            Product product = new Product();
	            product.setProductId(orderDetailsDTO.getProductId());
	            existingOrderDetails.setProduct(product);
	        }

	        // 保存更新後的 OrderDetails
	        OrderDetails updatedOrderDetails = orderDetailsRepository.save(existingOrderDetails);

	        // 將更新後的實體轉換回 DTO
	        OrderDetailsDTO updatedOrderDetailsDTO = convertToDTO(updatedOrderDetails);

	        return ResponseEntity.ok(updatedOrderDetailsDTO);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	// 根據 orderId 獲取所有 OrderDetails
	public List<OrderDetailsDTO> getOrderDetailsByOrderId(Integer orderId) {
		List<OrderDetails> orderDetailsList = orderDetailsRepository.findByOrdersOrderId(orderId);

		// 將查詢結果轉換為 DTO
		return orderDetailsList.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	// 將 OrderDetails 實體轉換為 DTO
	private OrderDetailsDTO convertToDTO(OrderDetails orderDetails) {
		String productImageBase64 = null;
		if (!orderDetails.getProduct().getProductImages().isEmpty()) {
			byte[] imageBytes = orderDetails.getProduct().getProductImages().get(0).getImage();
			productImageBase64 = Base64.getEncoder().encodeToString(imageBytes);
		}

		return new OrderDetailsDTO(
				orderDetails.getProduct().getName(), // 商品名稱
				orderDetails.getProduct().getSku(), // 商品 SKU
				orderDetails.getQuantity(), // 商品數量
				orderDetails.getPrice()  // 商品價格
		);
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
