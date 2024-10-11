package tw.luna.FinalTest.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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
import org.springframework.ui.Model;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import tw.luna.FinalTest.dto.OrderDetailsDTO;
import tw.luna.FinalTest.dto.OrderWithUserDTO;
import tw.luna.FinalTest.dto.OrdersDTO;
import tw.luna.FinalTest.dto.ProductImageDTO;
import tw.luna.FinalTest.dto.UserDTO;
import tw.luna.FinalTest.dto.orders.OrdersInsertDto;
import tw.luna.FinalTest.model.Cart;
import tw.luna.FinalTest.model.CartItems;
import tw.luna.FinalTest.model.Coupon;
import tw.luna.FinalTest.model.DiscountType;
import tw.luna.FinalTest.model.OrderDetails;
import tw.luna.FinalTest.model.Orders;
import tw.luna.FinalTest.model.Payment;
import tw.luna.FinalTest.model.ProductImage;
import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.repository.CartRepository;
import tw.luna.FinalTest.repository.CouponRepository;
import tw.luna.FinalTest.repository.OrderDetailsRepository;
import tw.luna.FinalTest.repository.OrdersRepository;
import tw.luna.FinalTest.repository.ProductImageRepository;
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
	
	@Autowired
    private ProductImageRepository productImageRepository;
	
	@Autowired
    private UsersServiceImpl usersServiceImpl;

	@Transactional
	public void insertOrder(OrdersInsertDto ordersInsertDto, Long userId) {
		Orders orders = new Orders();

		// 找出目前的使用者並將使用者資訊存入訂單
		Users user = userRepository.getReferenceById(userId);

		orders.setUser(user);
//		List<OrderDetails> orderDetails = orders.getOrderDetails();

		List<OrderDetails> orderDetails = new ArrayList<>();

		Cart cart = cartRepository.findByUsersUserId(userId);
		orders.setCart(cart);
		List<CartItems> cartItems = cart.getCartItems();
		for (CartItems cartItem : cartItems) {
			OrderDetails orderDetail = new OrderDetails();
			orderDetail.setOrder(orders);
			orderDetail.setProduct(cartItem.getProduct());


			cartItem.getProduct().setStockQuantity(cartItem.getProduct().getStockQuantity() - cartItem.getQuantity());


			orderDetail.setQuantity(cartItem.getQuantity());
			orderDetail.setPrice(cartItem.getPrice());
			orderDetails.add(orderDetail);
		}
		orders.setOrderDetails(orderDetails);

		if (ordersInsertDto.getCode() != null && !Objects.equals(ordersInsertDto.getCode(), "")) {
			Coupon coupon = couponRepository.findCouponByCode(ordersInsertDto.getCode());

			if (coupon.getDiscountType() == DiscountType.percentage) {
				orders.setPercentageDiscount(coupon.getDiscountValue());

				orders.setCoupon(coupon);

			} else if (coupon.getDiscountType() == DiscountType.amount) {

				orders.setAmountDiscount(coupon.getDiscountValue());
				orders.setCoupon(coupon);

			}

		}
		orders.setOrderDate(LocalDateTime.now());
		orders.setTotalAmount(ordersInsertDto.getTotalAmount());
		orders.setFinalAmount(ordersInsertDto.getFinalAmount());
		orders.setStatus("pending");
		orders.setAddress(ordersInsertDto.getAddress());


		Payment payment = new Payment();
		payment.setOrder(orders);
		payment.setPaymentAmount(ordersInsertDto.getPaymentAmount());
		payment.setPaymentDate(LocalDateTime.now());
		payment.setMerchantNo(ordersInsertDto.getMerchantNo());
		orders.setPayment(payment);

		ordersRepository.save(orders);
	}

	// 獲取所有訂單
	public List<Orders> getAllOrders() {
		return ordersRepository.findAll();
	}
	
	// 獲取所有訂單
	public List<Orders> getAllByUser_UserId(long userId) {
		return ordersRepository.findByUser_UserId(userId);
	}

	public ResponseEntity<Page<OrderWithUserDTO>> getOrdersWithPagination(int page, int size, String sortField,
            String sortDirection, String status) {
    // 根據傳入的排序方向，轉換為 Sort.Direction
    Sort.Direction direction = Sort.Direction.fromString(sortDirection);

    // 使用排序字段和方向來創建分頁請求
    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));

    Page<Orders> orders;

    if (status != null && !status.isEmpty() && !status.equalsIgnoreCase("all")) {
        orders = ordersRepository.findByStatus(status, pageable);
    } else {
        orders = ordersRepository.findAll(pageable);
    }

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

	public Optional<OrdersDTO> getOrderById(Integer id) {
	    return ordersRepository.findById(id).map(order -> {
	        // 創建 UserDTO
	        UserDTO userDTO = new UserDTO(
	            order.getUser().getUserId(),
	            order.getUser().getUsername(),
	            order.getUser().getEmail(),
	            order.getUser().getPhoneNumber(),
	            order.getAddress() // 使用訂單的地址
	        );

	        // 轉換 orderDetails 為 DTO 列表
	        List<OrderDetailsDTO> orderDetailsDTOList = order.getOrderDetails().stream()
	            .map(this::convertToOrderDetailsDTO)
	            .collect(Collectors.toList());

	        // 創建並返回 OrdersDTO
	        return new OrdersDTO(
	            order.getOrderId(),
	            order.getOrderDate(),
	            order.getAddress(),
	            order.getTotalAmount(),
	            order.getCoupon() != null ? order.getCoupon().getCode() : null,
	            order.getPercentageDiscount(),
	            order.getAmountDiscount(),
	            order.getFinalAmount(),
	            order.getStatus(),
	            orderDetailsDTOList,
	            userDTO
	        );
	    });
	}

	// 輔助方法：轉換 OrderDetails 到 OrderDetailsDTO
	private OrderDetailsDTO convertToOrderDetailsDTO(OrderDetails details) {
	    if (details == null || details.getProduct() == null) {
	        return null;
	    }

	    // 獲取產品圖片
	    List<ProductImageDTO> productImages = details.getProduct().getProductImages().stream()
	        .map(image -> new ProductImageDTO(
	            image.getId(),
	            details.getProduct().getProductId(),
	            image.getImage() // 假設這是存儲在數據庫中的圖片URL
	        ))
	        .collect(Collectors.toList());

	    return new OrderDetailsDTO(
	        details.getProduct().getName(),
	        details.getProduct().getSku(),
	        details.getQuantity(),
	        details.getPrice(),
	        details.getProduct().getProductId(),
	        productImages // 傳遞產品圖片列表
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

	// 獲取每日的日期標籤
	public List<String> getDailyLabels(LocalDateTime startDate, LocalDateTime endDate) {
		List<Map<String, Object>> result = ordersRepository.aggregateRevenueByDay(startDate, endDate);
		return result.stream().map(entry -> entry.get("orderDate").toString()) // 提取日期標籤
				.collect(Collectors.toList());
	}

	// 獲取每日的營業額數據
	public List<Integer> getDailyRevenue(LocalDateTime startDate, LocalDateTime endDate) {
	    List<Map<String, Object>> result = ordersRepository.aggregateRevenueByDay(startDate, endDate);
	    return result.stream()
	        .map(entry -> Optional.ofNullable((Number) entry.get("totalRevenue")).orElse(0).intValue()) // 提取營業額數值
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
		return result.stream()
				.map(entry -> Optional.ofNullable((Number) entry.get("totalRevenue")).orElse(0).intValue()) // 提取營業額數值
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
		return result.stream()
				.map(entry -> Optional.ofNullable((Number) entry.get("totalRevenue")).orElse(0).intValue()) // 提取營業額數值
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
	
	public String getOrdersList(Model model) {
        Long userId = usersServiceImpl.getCurrentUserId();
        if (userId == null) {
            model.addAttribute("errorMessage", "請先登錄以查看您的訂單");
            return "redirect:/login";
        }
        
        try {
            // 使用更新後的方法名
            List<OrdersDTO> orders = ordersRepository.findOrdersDTOByUserId(userId);
            model.addAttribute("orders", orders);
            return "orderManage";
        } catch (Exception e) {
            model.addAttribute("errorMessage", "無法載入訂單列表，請稍後再試");
            return "error";
        }
    }

    public String getOrderDetails(Integer orderId, Model model) {
        Long userId = usersServiceImpl.getCurrentUserId();
        if (userId == null) {
            model.addAttribute("errorMessage", "請先登錄以查看訂單詳情");
            return "redirect:/login";
        }
        
        try {
            // 使用更新後的方法名
            Optional<Orders> orderOpt = ordersRepository.findByOrderIdAndUser_UserId(orderId, userId);
            if (orderOpt.isPresent()) {
                // 可能需要將 Orders 轉換為 OrdersDTO
                model.addAttribute("order", convertToDTO(orderOpt.get()));
                return "checkOrder";
            } else {
                model.addAttribute("errorMessage", "找不到指定的訂單");
                return "error";
            }
        } catch (Exception e) {
            model.addAttribute("errorMessage", "無法載入訂單詳情，請稍後再試");
            return "error";
        }
    }
    
    private OrderDetailsDTO convertToDTO(OrderDetails orderDetails) {
        if (orderDetails == null || orderDetails.getProduct() == null) {
            return null;
        }

        // 初始化產品圖片列表
        List<ProductImageDTO> productImages = new ArrayList<>();
        if (orderDetails.getProduct().getProductImages() != null && !orderDetails.getProduct().getProductImages().isEmpty()) {
            ProductImage firstImage = orderDetails.getProduct().getProductImages().get(0);
            productImages.add(new ProductImageDTO(
                firstImage.getId(),
                orderDetails.getProduct().getProductId(),
                firstImage.getImage()
            ));
        }

        // 創建 DTO 對象
        OrderDetailsDTO dto = new OrderDetailsDTO(
            orderDetails.getProduct().getName(),
            orderDetails.getProduct().getSku(),
            orderDetails.getQuantity(),
            orderDetails.getPrice(),
            orderDetails.getProduct().getProductId(),
            productImages  // 傳遞產品圖片列表
        );

        // 計算並設置總價
        dto.setTotal(orderDetails.getQuantity() * orderDetails.getPrice());

        return dto;
    }

    
    private OrdersDTO convertToDTO(Orders order) {
        if (order == null) {
            return null;
        }

        List<OrderDetailsDTO> orderDetailsDTOs = order.getOrderDetails().stream()
                .map(this::convertToOrderDetailsDTO)
                .collect(Collectors.toList());

        return new OrdersDTO(
            order.getOrderId(),
            order.getOrderDate(),
            order.getAddress(),
            order.getTotalAmount(),
            order.getCoupon() != null ? order.getCoupon().getCode() : null,
            order.getPercentageDiscount(),
            order.getAmountDiscount(),
            order.getFinalAmount(),
            order.getStatus(),
            orderDetailsDTOs,
            convertToUserDTO(order.getUser())
        );
    }

    private UserDTO convertToUserDTO(Users user) {
        return new UserDTO(
            user.getUserId(),
            user.getUsername(),
            user.getEmail(),
            user.getPhoneNumber(),
            user.getUserinfo() != null ? user.getUserinfo().getAddress() : null
        );
    }
    
    public List<OrderDetailsDTO> getOrderDetailsDTOs(Integer orderId) {
        List<OrderDetails> orderDetails = orderDetailsRepository.findByOrdersOrderId(orderId);
        return orderDetails.stream()
                .map(this::convertToDTO)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
    
    public List<OrdersDTO> getUserOrders(Long userId) {
        List<Orders> orders = ordersRepository.findByUserUserId(userId);
        return orders.stream().map(order -> {
            OrdersDTO dto = convertToDTO(order);
            dto.setOrderDetails(order.getOrderDetails().stream()
                .map(detail -> {
                    List<ProductImageDTO> productImages = productImageRepository
                        .findByProductProductId(detail.getProduct().getProductId())
                        .stream()
                        .map(image -> new ProductImageDTO(
                            image.getId(),
                            image.getProduct().getProductId(),
                            image.getImage()))
                        .collect(Collectors.toList());
                    return convertToOrderDetailsDTO(detail, productImages);
                })
                .collect(Collectors.toList()));
            return dto;
        }).collect(Collectors.toList());
    }
    
    private OrderDetailsDTO convertToOrderDetailsDTO(OrderDetails detail, List<ProductImageDTO> productImages) {
        return new OrderDetailsDTO(
            detail.getProduct().getName(),
            detail.getProduct().getSku(),
            detail.getQuantity(),
            detail.getPrice(),
            detail.getProduct().getProductId(),
            productImages
        );
    }
    
    public long getUserId(HttpSession session) {
      UserAllInfo loggedInUser = null;
      if(session != null) {
          loggedInUser = (UserAllInfo)session.getAttribute("loggedInUser");
          if(loggedInUser != null) {
              System.out.println("在products中獲取UserID:" + loggedInUser.getUserId());
          }
      }
      return loggedInUser.getUserId();
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
