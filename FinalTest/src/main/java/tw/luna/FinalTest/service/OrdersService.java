package tw.luna.FinalTest.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import tw.luna.FinalTest.dto.OrderWithUserDTO;
import tw.luna.FinalTest.dto.orders.OrdersInsertDto;
import tw.luna.FinalTest.model.*;
import tw.luna.FinalTest.repository.CartRepository;
import tw.luna.FinalTest.repository.CouponRepository;
import tw.luna.FinalTest.repository.OrdersRepository;
import tw.luna.FinalTest.repository.UsersRepository;

@Service
public class OrdersService {

    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    UsersRepository userRepository;

    @Autowired
    CouponRepository couponRepository;



    @Transactional
    public void insertOrder(OrdersInsertDto ordersInsertDto,Long userId) {
    Orders orders = new Orders();


        //找出目前的使用者並將使用者資訊存入訂單
        Users user = userRepository.getReferenceById(userId);


        orders.setUser(user);
        List<OrderDetails> orderDetails = orders.getOrderDetails();

        Cart cart = cartRepository.findByUsersUserId(userId);
        orders.setCart(cart);
        Set<CartItems> cartItems = cart.getCartItems();
        for (CartItems cartItem : cartItems) {
            OrderDetails orderDetail = new OrderDetails();
            orderDetail.setOrder(orders);
            orderDetail.setProduct(cartItem.getProduct());
            orderDetail.setQuantity(cartItem.getQuantity());
            orderDetail.setPrice(cartItem.getPrice());
            orderDetails.add(orderDetail);
            System.out.println("1" + orderDetail);
            System.out.println(orderDetails);
        }
        orders.setOrderDetails(orderDetails);

        if (ordersInsertDto.getCode() != null) {
            Coupon coupon = couponRepository.findCouponByCode(ordersInsertDto.getCode());
            if(coupon.getDiscountType() == DiscountType.percentage) {
                orders.setPercentageDiscount(coupon.getDiscountValue());
            }else if(coupon.getDiscountType() == DiscountType.amount) {
                orders.setAmountDiscount(coupon.getDiscountValue());
            }
            orders.setCoupon(coupon);
        }
        orders.setOrderDate(LocalDateTime.now());
        orders.setTotalAmount(ordersInsertDto.getTotalAmount());
        orders.setFinalAmount(ordersInsertDto.getFinalAmount());
        orders.setStatus("pending");
        orders.setAddress(ordersInsertDto.getAddress());


//        Set<CartItems> cartItems = cart.getCartItems();
//        cartItems.stream().map(cartItem -> {
//            orderDetails.stream().map(orderDetails1 -> {
//
//            });
//
//        });

        String random = UUID.randomUUID().toString().replaceAll("-", "").substring(0,
                8);

        Payment payment = new Payment();
        payment.setOrder(orders);
        payment.setPaymentAmount(ordersInsertDto.getPaymentAmount());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setMerchantNo(random);
        orders.setPayment(payment);

        ordersRepository.save(orders);
    }

 // 獲取所有訂單
 	public List<Orders> getAllOrders() {
 		return ordersRepository.findAll();
 	}

 	public ResponseEntity<Page<OrderWithUserDTO>> getOrdersWithPagination(int page, int size, String sortField, String sortDirection) {
 	    // 根據傳入的排序方向，轉換為 Sort.Direction
 	    Sort.Direction direction = Sort.Direction.fromString(sortDirection);

 	    // 使用排序字段和方向來創建分頁請求
 	    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));

 	    // 查詢訂單數據
 	    Page<Orders> orders = ordersRepository.findAll(pageable);

 	    // 將查詢到的訂單數據轉換為 DTO
 	    Page<OrderWithUserDTO> orderDTOs = orders.map(order -> {
 	        OrderWithUserDTO dto = new OrderWithUserDTO();
 	        dto.setOrderId(order.getOrderId());
 	        dto.setOrderDate(order.getOrderDate());
 	        dto.setTotalAmount(order.getTotalAmount());
 	        dto.setPercentageDiscount(order.getPercentageDiscount());
 	        dto.setAmountDiscount(order.getAmountDiscount());
 	        dto.setFinalAmount(order.getFinalAmount());
 	        dto.setStatus(order.getStatus());

 	        // 設置用戶相關的字段
 	        dto.setUsername(order.getUser().getUsername());
 	        dto.setEmail(order.getUser().getEmail());
 	        dto.setPhoneNumber(order.getUser().getPhoneNumber());

 	        return dto;
 	    });

 	    return ResponseEntity.ok(orderDTOs);
 	}


 	// 根據 ID 獲取單個訂單
 	public ResponseEntity<Orders> getOrderById(Integer id) {
 	    Optional<Orders> optionalOrder = ordersRepository.findById(id);

 	    if (optionalOrder.isPresent()) {
 	        // 找到訂單，返回 200 OK 和訂單信息
 	        return ResponseEntity.ok(optionalOrder.get());
 	    } else {
 	        // 未找到訂單，返回 404 Not Found
 	        return ResponseEntity.notFound().build();
 	    }
 	}

 	public Integer getTotalRevenue(LocalDateTime startDate, LocalDateTime endDate) {
         return ordersRepository.findTotalRevenueWithinPeriod(startDate, endDate);
    }

 	public Integer getTotalOrders(LocalDateTime startDate, LocalDateTime endDate) {
 	    return ordersRepository.countOrdersWithinPeriod(startDate, endDate);
 	}

 	private Integer calculateTotalAmount(List<Object[]> cartWithItems) {
 	    return cartWithItems.stream()
 	            .mapToInt(result -> {
 	                CartItems cartItem = (CartItems) result[1];
 	                return cartItem.getPrice() * cartItem.getQuantity();
 	            }).sum();
 	}



// 	// 刪除訂單
// 	public ResponseEntity<Void> deleteOrder(Integer id) {
// 		Optional<Order> optionalOrder = orderRepository.findById(id);
 //
// 		if (optionalOrder.isPresent()) {
// 			orderRepository.delete(optionalOrder.get());
// 			return ResponseEntity.ok().build();
// 		} else {
// 			return ResponseEntity.notFound().build();
// 		}
// 	}




}
