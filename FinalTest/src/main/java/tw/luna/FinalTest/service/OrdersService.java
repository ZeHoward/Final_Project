package tw.luna.FinalTest.service;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import tw.luna.FinalTest.dto.OrderDetailsDTO;
import tw.luna.FinalTest.dto.OrderWithUserDTO;
import tw.luna.FinalTest.dto.OrdersDTO;
import tw.luna.FinalTest.dto.orders.OrdersInsertDto;
import tw.luna.FinalTest.model.Cart;
import tw.luna.FinalTest.model.CartItems;
import tw.luna.FinalTest.model.Coupon;
import tw.luna.FinalTest.model.DiscountType;
import tw.luna.FinalTest.model.OrderDetails;
import tw.luna.FinalTest.model.Orders;
import tw.luna.FinalTest.model.Payment;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.repository.CartRepository;
import tw.luna.FinalTest.repository.CouponRepository;
import tw.luna.FinalTest.repository.OrderDetailsRepository;
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

	@Autowired
	OrderDetailsRepository orderDetailsRepository;

	@Transactional
	public void insertOrder(OrdersInsertDto ordersInsertDto, Long userId) {
		Orders orders = new Orders();

		// 找出目前的使用者並將使用者資訊存入訂單
		Users user = userRepository.getReferenceById(userId);

		orders.setUser(user);
		List<OrderDetails> orderDetails = orders.getOrderDetails();

		Cart cart = cartRepository.findByUsersUserId(userId);
		orders.setCart(cart);
		List<CartItems> cartItems = cart.getCartItems();
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
			if (coupon.getDiscountType() == DiscountType.percentage) {
				orders.setPercentageDiscount(coupon.getDiscountValue());
			} else if (coupon.getDiscountType() == DiscountType.amount) {
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

		String random = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 8);

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

	public ResponseEntity<Page<OrderWithUserDTO>> getOrdersWithPagination(int page, int size, String sortField,
			String sortDirection) {
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

	// 根據 orderId 獲取訂單並轉換為 DTO
	public Optional<OrdersDTO> getOrderById(Integer id) {
		Optional<Orders> optionalOrder = ordersRepository.findById(id);

		if (optionalOrder.isPresent()) {
			Orders order = optionalOrder.get();

			// 將 orderDetails 轉換為 DTO 列表
			List<OrderDetailsDTO> orderDetailsDTOList = order
					.getOrderDetails().stream().map(details -> new OrderDetailsDTO(details.getProduct().getName(),
							details.getProduct().getSku(), details.getQuantity(), details.getPrice()))
					.collect(Collectors.toList());

			OrdersDTO ordersDTO = new OrdersDTO(order.getOrderId(), order.getOrderDate(), order.getAddress(),
					order.getTotalAmount(), order.getCoupon() != null ? order.getCoupon().getCode() : null,
					order.getPercentageDiscount(), order.getAmountDiscount(), order.getFinalAmount(), order.getStatus(),
					orderDetailsDTOList // 傳遞商品詳情
			);

			return Optional.of(ordersDTO);
		} else {
			return Optional.empty();
		}
	}

	private OrderDetailsDTO convertToDTO(OrderDetails orderDetails) {
		String productImageBase64 = null;
		if (!orderDetails.getProduct().getProductImages().isEmpty()) {
			byte[] imageBytes = orderDetails.getProduct().getProductImages().get(0).getImage();
			productImageBase64 = Base64.getEncoder().encodeToString(imageBytes);
		}

		return new OrderDetailsDTO(orderDetails.getProduct().getName(), // 商品名稱
				orderDetails.getProduct().getSku(), // 商品 SKU
				orderDetails.getPrice(), // 商品價格
				orderDetails.getQuantity() // 商品數量
		);
	}

	public Integer getTotalRevenue(LocalDateTime startDate, LocalDateTime endDate) {
		return ordersRepository.findTotalRevenueWithinPeriod(startDate, endDate);
	}

	public Integer getTotalOrdersCount(LocalDateTime startDate, LocalDateTime endDate) {
		return ordersRepository.countOrdersWithinPeriod(startDate, endDate);
	}

// 	public Integer getTotalOrders(LocalDateTime startDate, LocalDateTime endDate) {
// 	    return ordersRepository.countOrdersWithinPeriod(startDate, endDate);
// 	}

	public List<String> getDailyLabels(LocalDateTime startDate, LocalDateTime endDate) {
		List<Map<String, Object>> result = ordersRepository.aggregateRevenueByDay(startDate, endDate);
		return result.stream().map(entry -> entry.get("orderDay").toString()) // 提取日期標籤
				.collect(Collectors.toList());

	}

	public List<Integer> getDailyRevenue(LocalDateTime startDate, LocalDateTime endDate) {
		List<Map<String, Object>> result = ordersRepository.aggregateRevenueByDay(startDate, endDate);
		return result.stream().map(entry -> ((Number) entry.get("totalRevenue")).intValue()) // 提取營業額數值
				.collect(Collectors.toList());
	}

	// 獲取每月的日期標籤
	public List<String> getMonthlyLabels(LocalDateTime startDate, LocalDateTime endDate) {
		List<Map<String, Object>> result = ordersRepository.aggregateRevenueByMonth(startDate, endDate);
		return result.stream()
				.map(entry -> entry.get("orderYear").toString() + "-" + entry.get("orderMonth").toString()) // 提取每月標籤
																											// (年份-月份)
				.collect(Collectors.toList());
	}

	// 獲取每月的營業額數據
	public List<Integer> getMonthlyRevenue(LocalDateTime startDate, LocalDateTime endDate) {
		List<Map<String, Object>> result = ordersRepository.aggregateRevenueByMonth(startDate, endDate);
		return result.stream().map(entry -> ((Number) entry.get("totalRevenue")).intValue()) // 提取營業額數值
				.collect(Collectors.toList());
	}

	// 獲取每年的日期標籤
	public List<String> getYearlyLabels(LocalDateTime startDate, LocalDateTime endDate) {
		List<Map<String, Object>> result = ordersRepository.aggregateRevenueByYear(startDate, endDate);
		return result.stream().map(entry -> entry.get("orderYear").toString()) // 提取年份標籤
				.collect(Collectors.toList());
	}

	// 獲取每年的營業額數據
	public List<Integer> getYearlyRevenue(LocalDateTime startDate, LocalDateTime endDate) {
		List<Map<String, Object>> result = ordersRepository.aggregateRevenueByYear(startDate, endDate);
		return result.stream().map(entry -> ((Number) entry.get("totalRevenue")).intValue()) // 提取營業額數值
				.collect(Collectors.toList());
	}

	// 獲取每日訂單數量
	public List<Integer> getDailyOrderCount(LocalDateTime startDate, LocalDateTime endDate) {
		List<Integer> dailyOrderCounts = new ArrayList<>();
		LocalDate currentDate = startDate.toLocalDate();
		LocalDate endLocalDate = endDate.toLocalDate();

		while (!currentDate.isAfter(endLocalDate)) {
			LocalDateTime dayStart = currentDate.atStartOfDay();
			LocalDateTime dayEnd = currentDate.atTime(LocalTime.MAX);

			int count = ordersRepository.countOrdersWithinPeriod(dayStart, dayEnd);
			dailyOrderCounts.add(count);

			currentDate = currentDate.plusDays(1);
		}

		return dailyOrderCounts;
	}

	// 獲取每月訂單數量
	public List<Integer> getMonthlyOrderCount(LocalDateTime startDate, LocalDateTime endDate) {
		List<Integer> monthlyOrderCounts = new ArrayList<>();
		YearMonth currentMonth = YearMonth.from(startDate);
		YearMonth endMonth = YearMonth.from(endDate);

		while (!currentMonth.isAfter(endMonth)) {
			LocalDateTime monthStart = currentMonth.atDay(1).atStartOfDay();
			LocalDateTime monthEnd = currentMonth.atEndOfMonth().atTime(LocalTime.MAX);

			int count = ordersRepository.countOrdersWithinPeriod(monthStart, monthEnd);
			monthlyOrderCounts.add(count);

			currentMonth = currentMonth.plusMonths(1);
		}

		return monthlyOrderCounts;
	}

	// 獲取每年訂單數量
	public List<Integer> getYearlyOrderCount(LocalDateTime startDate, LocalDateTime endDate) {
		List<Integer> yearlyOrderCounts = new ArrayList<>();
		int startYear = startDate.getYear();
		int endYear = endDate.getYear();

		for (int year = startYear; year <= endYear; year++) {
			LocalDateTime yearStart = LocalDateTime.of(year, 1, 1, 0, 0);
			LocalDateTime yearEnd = LocalDateTime.of(year, 12, 31, 23, 59, 59);

			int count = ordersRepository.countOrdersWithinPeriod(yearStart, yearEnd);
			yearlyOrderCounts.add(count);
		}

		return yearlyOrderCounts;
	}

	private Integer calculateTotalAmount(List<Object[]> cartWithItems) {
		return cartWithItems.stream().mapToInt(result -> {
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
