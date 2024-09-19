package tw.luna.FinalTest.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import tw.luna.FinalTest.model.Coupon;
import tw.luna.FinalTest.model.UserCoupon;
import tw.luna.FinalTest.repository.CouponRepository;
import tw.luna.FinalTest.repository.UserCouponRepository;
@Service
public class CouponService {

    private final CouponRepository couponRepository;
    private final UserCouponRepository userCouponRepository;

    public CouponService(CouponRepository couponRepository, UserCouponRepository userCouponRepository) {
        this.couponRepository = couponRepository;
        this.userCouponRepository = userCouponRepository;
    }

    // 檢查優惠券是否有效
    public Coupon validateCoupon(String code) {
        Coupon coupon = couponRepository.findCouponByCode(code);
        if (coupon != null && coupon.getExpiryDate().isAfter(LocalDate.now())) {
            return coupon;
        }
        throw new IllegalArgumentException("無效或過期的優惠券");
    }
    
 // 發放優惠券給用戶
    public void issueCouponToUser(long userId, String couponCode) {
        Coupon coupon = couponRepository.findCouponByCode(couponCode);
        if (coupon == null || coupon.getExpiryDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("優惠券無效或已過期");
        }

        UserCoupon existingUserCoupon = userCouponRepository.findUserCouponByUserIdAndCouponId(userId, coupon.getCouponId());
        if (existingUserCoupon != null) {
            throw new IllegalArgumentException("用戶已經擁有此優惠券");
        }

        UserCoupon userCoupon = new UserCoupon();
        userCoupon.setUserId(userId);
        userCoupon.setCouponId(coupon.getCouponId());
        userCoupon.setUsed(false);

        userCouponRepository.save(userCoupon);
    }


    // 查詢用戶擁有的優惠券
    public List<UserCoupon> getUserCoupons(long userId) {
        return userCouponRepository.findCouponsByUserId(userId);
    }

    // 使用優惠券
    public void useCoupon(long userId, long couponId) {
        UserCoupon userCoupon = userCouponRepository.findUserCoupon(userId, couponId);
        if (userCoupon != null && !userCoupon.isUsed()) {
            userCoupon.setUsed(true);
//            userCouponRepository.update(userCoupon);
        } else {
            throw new IllegalArgumentException("優惠券無效或已使用");
        }
    }
}

