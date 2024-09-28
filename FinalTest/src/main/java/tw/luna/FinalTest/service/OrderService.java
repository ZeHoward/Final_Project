package tw.luna.FinalTest.service;

import org.springframework.stereotype.Service;

@Service
public class OrderService {

//	@Autowired
//	private OrderRepository orderRepository;
//	
//	@Autowired
//    private OrderDetailsRepository orderDetailsRepository;
//
//	@Autowired
//    private CartRepository cartRepository;
//    
//    @Autowired
//    private CartItemsRepository cartItemsRepository;
//
//	// 獲取所有訂單
//	public List<Order> getAllOrders() {
//		return orderRepository.findAll();
//	}
//
//	public ResponseEntity<Page<OrderWithUserDTO>> getOrdersWithPagination(int page, int size, String sortField, String sortDirection) {
//	    // 根據傳入的排序方向，轉換為 Sort.Direction
//	    Sort.Direction direction = Sort.Direction.fromString(sortDirection);
//	    
//	    // 使用排序字段和方向來創建分頁請求
//	    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));
//	    
//	    // 查詢訂單數據
//	    Page<Order> orders = orderRepository.findAll(pageable);
//
//	    // 將查詢到的訂單數據轉換為 DTO
//	    Page<OrderWithUserDTO> orderDTOs = orders.map(order -> {
//	        OrderWithUserDTO dto = new OrderWithUserDTO();
//	        dto.setOrderId(order.getOrderId());
//	        dto.setOrderDate(order.getOrderDate());
//	        dto.setTotalAmount(order.getTotalAmount());
//	        dto.setPercentageDiscount(order.getPercentageDiscount());
//	        dto.setAmountDiscount(order.getAmountDiscount());
//	        dto.setFinalAmount(order.getFinalAmount());
//	        dto.setStatus(order.getStatus());
//
//	        // 設置用戶相關的字段
//	        dto.setUsername(order.getUser().getUsername());
//	        dto.setEmail(order.getUser().getEmail());
//	        dto.setPhoneNumber(order.getUser().getPhoneNumber());
//
//	        return dto;
//	    });
//
//	    return ResponseEntity.ok(orderDTOs);
//	}
//
//
//	// 根據 ID 獲取單個訂單
//	public ResponseEntity<Order> getOrderById(Integer id) {
//	    Optional<Order> optionalOrder = orderRepository.findById(id);
//
//	    if (optionalOrder.isPresent()) {
//	        // 找到訂單，返回 200 OK 和訂單信息
//	        return ResponseEntity.ok(optionalOrder.get());
//	    } else {
//	        // 未找到訂單，返回 404 Not Found
//	        return ResponseEntity.notFound().build();
//	    }
//	}
//	
//	public Integer getTotalRevenue(LocalDateTime startDate, LocalDateTime endDate) {
//        return orderRepository.findTotalRevenueWithinPeriod(startDate, endDate);
//    }
//
//	private Integer calculateTotalAmount(List<Object[]> cartWithItems) {
//	    return cartWithItems.stream()
//	            .mapToInt(result -> {
//	                CartItems cartItem = (CartItems) result[1];
//	                return cartItem.getPrice() * cartItem.getQuantity();
//	            }).sum();
//	}

	

//	// 刪除訂單
//	public ResponseEntity<Void> deleteOrder(Integer id) {
//		Optional<Order> optionalOrder = orderRepository.findById(id);
//
//		if (optionalOrder.isPresent()) {
//			orderRepository.delete(optionalOrder.get());
//			return ResponseEntity.ok().build();
//		} else {
//			return ResponseEntity.notFound().build();
//		}
//	}
}
