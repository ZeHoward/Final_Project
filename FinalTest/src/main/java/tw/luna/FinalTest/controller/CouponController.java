package tw.luna.FinalTest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tw.luna.FinalTest.dto.UserCouponDTO;
import tw.luna.FinalTest.model.Coupon;
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

	@PostMapping("/validate")
	public ResponseEntity<Map<String, Object>> validateCoupon(@RequestParam String couponCode, @RequestParam long userId) {
		Map<String, Object> response = couponService.validateCouponAndReturnDetails(couponCode, userId);
		if ((boolean) response.get("success")) {
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/issue")
	public ResponseEntity<String> issueCoupon(@RequestParam long userId, @RequestParam String couponCode) {
		try {
			couponService.issueCouponToUser(userId, couponCode);
			return ResponseEntity.ok("優惠券已成功發放");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("/all")
	public ResponseEntity<List<Coupon>> getAllCoupons() {
		return ResponseEntity.ok(couponService.getAllCoupons());
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<UserCouponDTO>> getUserCoupons(@PathVariable int userId) {
		return ResponseEntity.ok(couponService.getUserCoupons(userId));
	}

	@PostMapping("/use")
	public ResponseEntity<String> useCoupon(@RequestParam long userId, @RequestParam long couponId) {
		couponService.useCoupon(userId, couponId);
		return ResponseEntity.ok("優惠券已使用");
	}

	@PostMapping("/create")
	public ResponseEntity<List<Coupon>> createCoupon(@RequestParam String code, @RequestParam String name,
													 @RequestParam String discountType, @RequestParam int discountValue,
													 @RequestParam String expiryDate) {
		try {
			couponService.createCoupon(code, name, discountType, discountValue, expiryDate);
			return ResponseEntity.ok(couponService.getAllCoupons());
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@PostMapping("/issue/all")
	public ResponseEntity<String> issueCouponToAllUsers(@RequestParam long couponId) {
		try {
			couponService.issueCouponToAllUsers(couponId);
			return ResponseEntity.ok("優惠券已成功發放給所有客戶");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("發放失敗: " + e.getMessage());
		}
	}

	@PostMapping("/apply-coupon")
	public ResponseEntity<Map<String, Object>> applyCouponToCart(@RequestParam Long cartId, @RequestParam String couponCode) {
		try {
			Map<String, Object> response = cartService.applyCouponToCart(cartId, couponCode);
			return ResponseEntity.ok(response);
		} catch (RuntimeException e) {
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("success", false);
			errorResponse.put("message", e.getMessage());
			return ResponseEntity.badRequest().body(errorResponse);
		}
	}

	@PostMapping("/toggle/{couponId}")
	public ResponseEntity<Map<String, Object>> toggleCouponStatus(@PathVariable long couponId) {
		Map<String, Object> response = couponService.toggleCouponStatusAndReturnDetails(couponId);
		if (response.containsKey("error")) {
			return ResponseEntity.badRequest().body(response);
		}
		return ResponseEntity.ok(response);
	}
}
