package tw.luna.FinalTest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tw.luna.FinalTest.Dto.UserCouponDTO;
import tw.luna.FinalTest.model.Cart;
import tw.luna.FinalTest.model.Coupon;
import tw.luna.FinalTest.model.UserCoupon;
import tw.luna.FinalTest.service.CartService;
import tw.luna.FinalTest.service.CouponService;
@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
@RequestMapping("/api/coupons")
public class CouponController {

	private final CouponService couponService;
	private final CartService cartService;

	public CouponController(CouponService couponService, CartService cartService) {
		this.couponService = couponService;
        this.cartService = cartService;
    }

	// 根據優惠券碼檢查優惠券是否有效
	@PostMapping("/validate")
	public ResponseEntity<Map<String, Object>> validateCoupon(@RequestParam String couponCode, @RequestParam long userId) {

		try {
			Coupon coupon = couponService.validateCoupon(couponCode, userId);

			// 返回成功結果
			Map<String, Object> response = new HashMap<>();
			response.put("success", true);
			response.put("message", "優惠券有效");
			response.put("discountType", coupon.getDiscountType());
			response.put("discountValue", coupon.getDiscountValue());

			return ResponseEntity.ok(response);
		} catch (IllegalArgumentException e) {
			// 返回錯誤結果
			Map<String, Object> response = new HashMap<>();
			response.put("success", false);
			response.put("message", e.getMessage());

			return ResponseEntity.badRequest().body(response);
		}
	}



	// 發放優惠券給用戶
	@PostMapping("/issue")
	public ResponseEntity<String> issueCoupon(@RequestParam long userId, @RequestParam String couponCode) {
		try {
			couponService.issueCouponToUser(userId, couponCode);
			return ResponseEntity.ok("優惠券已成功發放");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	// 查詢所有優惠券：後台
	@GetMapping("/all")
	public ResponseEntity<List<Coupon>> getAllCoupons() {
		List<Coupon> coupons = couponService.getAllCoupons();
		return ResponseEntity.ok(coupons);
	}

	// 查詢用戶的所有優惠券：用戶查詢
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<UserCouponDTO>> getUserCoupons(@PathVariable int userId) {
		List<UserCouponDTO> userCoupons = couponService.getUserCoupons(userId);
		return ResponseEntity.ok(userCoupons);
	}

	// 使用優惠券
	@PostMapping("/use")
	public ResponseEntity<String> useCoupon(@RequestParam long userId, @RequestParam long couponId) {
		couponService.useCoupon(userId, couponId);
		return ResponseEntity.ok("優惠券已使用");
	}

	// 創建新的優惠券並返回所有優惠券
    @PostMapping("/create")
    public ResponseEntity<List<Coupon>> createCoupon(
            @RequestParam String code,
            @RequestParam String name,
            @RequestParam String discountType,
            @RequestParam int discountValue,
            @RequestParam String expiryDate) {
        try {
            // 創建新的優惠券
            couponService.createCoupon(code, name, discountType, discountValue, expiryDate);
            
            // 創建成功後，回傳所有優惠券的列表
            List<Coupon> allCoupons = couponService.getAllCoupons();
            return ResponseEntity.ok(allCoupons);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
	
	// 發放優惠券給所有客戶
    @PostMapping("/issue/all")
    public ResponseEntity<String> issueCouponToAllUsers(@RequestParam long couponId) {
        try {
            couponService.issueCouponToAllUsers(couponId);
            return ResponseEntity.ok("優惠券已成功發放給所有客戶");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("發放失敗: " + e.getMessage());
        }
    }
	// 應用優惠券到購物車
	@PostMapping("/apply-coupon")
	public ResponseEntity<Map<String, Object>> applyCouponToCart(
			@RequestParam Long cartId,
			@RequestParam String couponCode) {
		try {
			// 調用 CartService 應用優惠券
			Map<String, Object> response = cartService.applyCouponToCart(cartId, couponCode);

			// 返回成功結果
			return ResponseEntity.ok(response);

		} catch (RuntimeException e) {
			// 返回錯誤結果
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("success", false);
			errorResponse.put("message", e.getMessage());
			return ResponseEntity.badRequest().body(errorResponse);
		}
	}

	// 切換優惠券的啟用/禁用狀態
	@PostMapping("/toggle/{couponId}")
	public ResponseEntity<Map<String, Object>> toggleCouponStatus(@PathVariable long couponId) {
		try {
			// 調用服務層來切換優惠券狀態
			Coupon updatedCoupon = couponService.toggleCouponStatus(couponId);

			// 返回 JSON 格式的完整優惠券數據
			Map<String, Object> response = new HashMap<>();
			response.put("message", updatedCoupon.isActive() ? "優惠券已啟用" : "優惠券已禁用");
			response.put("coupon", updatedCoupon);  // 返回完整的優惠券對象

			return ResponseEntity.ok(response);
		} catch (IllegalArgumentException e) {
			// 返回錯誤信息的 JSON
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("error", e.getMessage());
			return ResponseEntity.badRequest().body(errorResponse);
		}
	}





}
