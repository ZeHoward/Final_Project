package tw.luna.FinalTest.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import tw.luna.FinalTest.model.Cart;
import tw.luna.FinalTest.model.CartItems;
import tw.luna.FinalTest.model.Order;
import tw.luna.FinalTest.model.OrderDetails;
import tw.luna.FinalTest.repository.CartItemsRepository;
import tw.luna.FinalTest.repository.CartRepository;
import tw.luna.FinalTest.repository.OrderDetailsRepository;
import tw.luna.FinalTest.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
    private OrderDetailsRepository orderDetailsRepository;

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

//	// 創建新訂單
//	public Order createOrder(Order order) {
//		return orderRepository.save(order);
//	}
	
//	@Transactional
//	public Order createOrderFromCart(Integer cartId, String address) {
//	    // Step 1: 查詢 cart 和 cartitems 資料
//	    List<Object[]> cartWithItems = cartItemsRepository.findCartWithItems(cartId);
//	    
//	    if (cartWithItems.isEmpty()) {
//	        throw new RuntimeException("購物車不存在或購物車沒有商品");
//	    }
//
//	    Cart cart = (Cart) cartWithItems.get(0)[0];  // 第一個結果中的 Cart
//	    Order order = new Order();
//	    
//	    // Step 2: 創建 order
//	    order.setUser(cart.getUsers());  // 直接從 Cart 中取得 Users 實體並設置
//	    order.setCart(cart);  // 直接設置 Cart 實體
//	    order.setOrderDate(LocalDateTime.now());
//	    order.setTotalAmount(calculateTotalAmount(cartWithItems));
//	    order.setFinalAmount(order.getTotalAmount());  // 假設沒有折扣
//	    order.setStatus("已付款");
//	    orderRepository.save(order);  // 儲存訂單
//
//	    // Step 3: 創建 orderDetails
//	    for (Object[] result : cartWithItems) {
//	        CartItems cartItem = (CartItems) result[1];  // 第二個結果是 CartItems
//
//	        OrderDetails orderDetails = new OrderDetails();
//	        orderDetails.setOrder(order);  // 設置對應的訂單
//	        orderDetails.setProduct(cartItem.getProduct());  // 設置 Product 對象而非 productId
//	        orderDetails.setQuantity(cartItem.getQuantity());
//	        orderDetails.setPrice(cartItem.getPrice());
//	        orderDetails.setAddress(address);  // 用戶提供的地址
//	        orderDetailsRepository.save(orderDetails);  // 儲存訂單詳情
//	    }
//
//	    // Step 4: 更新 cart 狀態
//	    cart.setStatus("已結帳");
//	    cartRepository.save(cart);  // 儲存 Cart 狀態變更
//	    return order;
//	}

	private Integer calculateTotalAmount(List<Object[]> cartWithItems) {
	    return cartWithItems.stream()
	            .mapToInt(result -> {
	                CartItems cartItem = (CartItems) result[1];
	                return cartItem.getPrice() * cartItem.getQuantity();
	            }).sum();
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
