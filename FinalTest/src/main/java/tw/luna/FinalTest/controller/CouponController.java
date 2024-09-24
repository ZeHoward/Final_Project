package tw.luna.FinalTest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tw.luna.FinalTest.model.Coupon;
import tw.luna.FinalTest.model.UserCoupon;
import tw.luna.FinalTest.service.CouponService;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

	private final CouponService couponService;

	public CouponController(CouponService couponService) {
		this.couponService = couponService;
	}

	// 根據優惠券碼檢查優惠券是否有效
	@GetMapping("/validate")
	public ResponseEntity<String> validateCoupon(@RequestParam String code, @RequestParam long userId) {
	    try {
	        couponService.validateCoupon(code, userId);
	        return ResponseEntity.ok("優惠券有效，可以使用");
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
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
	public ResponseEntity<List<UserCoupon>> getUserCoupons(@PathVariable int userId) {
		List<UserCoupon> userCoupons = couponService.getUserCoupons(userId);
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

}
