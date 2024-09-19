package tw.luna.FinalTest.controller;

import java.util.List;

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
    public ResponseEntity<Coupon> validateCoupon(@RequestParam String code) {
        Coupon coupon = couponService.validateCoupon(code);
        return ResponseEntity.ok(coupon);
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

    // 查詢用戶的所有優惠券
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

}
