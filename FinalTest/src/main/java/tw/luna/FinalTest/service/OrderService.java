package tw.luna.FinalTest.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import tw.luna.FinalTest.model.Cart;
import tw.luna.FinalTest.model.CartItems;
import tw.luna.FinalTest.model.Order;
import tw.luna.FinalTest.model.OrderDetails;
import tw.luna.FinalTest.repository.CartItemsRepository;
import tw.luna.FinalTest.repository.CartRepository;
import tw.luna.FinalTest.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private CartItemsRepository cartItemsRepository;

	// 獲取所有訂單
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	public ResponseEntity<Page<Order>> getOrdersWithPagination(int page, int size, String sortField, String sortDirection) {
	    // 根據傳入的排序方向，轉換為 Sort.Direction
	    Sort.Direction direction = Sort.Direction.fromString(sortDirection);
	    
	    // 使用排序字段和方向來創建分頁請求
	    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));
	    
	    // 查詢訂單數據
	    Page<Order> orders = orderRepository.findAll(pageable);
	    
	    return ResponseEntity.ok(orders);
	}

	// 根據 ID 獲取單個訂單
	public ResponseEntity<Order> getOrderById(Integer id) {
	    Optional<Order> optionalOrder = orderRepository.findById(id);

	    if (optionalOrder.isPresent()) {
	        // 找到訂單，返回 200 OK 和訂單信息
	        return ResponseEntity.ok(optionalOrder.get());
	    } else {
	        // 未找到訂單，返回 404 Not Found
	        return ResponseEntity.notFound().build();
	    }
	}

	// 創建新訂單
	public Order createOrder(Order order) {
		return orderRepository.save(order);
	}
	
	// 結帳處理邏輯
    @Transactional
    public Order checkoutCart(Integer cartId, String address) {
        // Step 1: 查詢購物車
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("購物車不存在"));

        // Step 2: 創建訂單
        Order order = new Order();
        order.setUserId(cart.getUserId());
        order.setCartId(cartId);
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(calculateTotalAmount(cart));
        order.setFinalAmount(order.getTotalAmount());  // 假設沒有折扣
        order.setStatus("已付款"); // 或其他狀態
        orderRepository.save(order);

        // Step 3: 創建訂單詳情
        List<CartItems> cartItems = CartItemsRepository.findByCartId(cartId);
        for (CartItems item : cartItems) {
            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setOrder(order);
            orderDetails.setProduct(item.getProduct());
            orderDetails.setQuantity(item.getQuantity());
            orderDetails.setPrice(item.getPrice());
            orderDetails.setAddress(address);
            orderDetailsRepository.save(orderDetails);
        }

        // Step 4: 清空購物車或標記購物車為已結帳
        cart.setStatus("已結帳");
        cartRepository.save(cart);

        return order; // 回傳訂單
    }

    // 計算購物車總金額
    private Integer calculateTotalAmount(Cart cart) {
        List<CartItems> cartItems = cartItemsRepository.findByCartId(cart.getCartId());
        return cartItems.stream().mapToInt(item -> item.getPrice() * item.getQuantity()).sum();
    }

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
