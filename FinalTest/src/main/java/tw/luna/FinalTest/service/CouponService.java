package tw.luna.FinalTest.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tw.luna.FinalTest.model.Coupon;
import tw.luna.FinalTest.model.DiscountType;
import tw.luna.FinalTest.model.User;
import tw.luna.FinalTest.model.UserCoupon;
import tw.luna.FinalTest.repository.CouponRepository;
import tw.luna.FinalTest.repository.UserCouponRepository;
import tw.luna.FinalTest.repository.UserRepository;

@Service
public class CouponService {

	private final CouponRepository couponRepository;
	private final UserCouponRepository userCouponRepository;
	private final UserRepository userRepository;
	

	public CouponService(CouponRepository couponRepository, UserCouponRepository userCouponRepository, UserRepository userRepository) {
		this.couponRepository = couponRepository;
		this.userCouponRepository = userCouponRepository;
		this.userRepository = userRepository;
	}

	// 檢查優惠券是否有效
	public Coupon validateCoupon(String code, long userId) {
	    // 先根據代碼從優惠券表中查找優惠券
	    Coupon coupon = couponRepository.findCouponByCode(code);
	    
	    if (coupon == null) {
	        throw new IllegalArgumentException("優惠券不存在");
	    }

	    // 檢查優惠券是否已過期
	    if (coupon.getExpiryDate().isBefore(LocalDate.now())) {
	        throw new IllegalArgumentException("優惠券已過期");
	    }

	    // 檢查用戶是否已擁有該優惠券
	    UserCoupon userCoupon = userCouponRepository.findUserCouponByUserIdAndCouponId(userId, coupon.getCouponId());
	    if (userCoupon == null) {
	        throw new IllegalArgumentException("用戶沒有該優惠券");
	    }

	    // 檢查優惠券是否已被使用
	    if (userCoupon.isUsed()) {
	        throw new IllegalArgumentException("優惠券已被使用");
	    }

	    return coupon; // 優惠券有效
	}



	// 發放優惠券給用戶
	public void issueCouponToUser(long userId, String couponCode) {
		
		Coupon coupon = couponRepository.findCouponByCode(couponCode);
		if (coupon == null || coupon.getExpiryDate().isBefore(LocalDate.now())) {
			throw new IllegalArgumentException("優惠券無效或已過期");
		}

		UserCoupon existingUserCoupon = userCouponRepository.findUserCouponByUserIdAndCouponId(userId,
				coupon.getCouponId());
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
		// 檢查用戶有無優惠券
		UserCoupon userCoupon = userCouponRepository.findUserCoupon(userId, couponId);
		if (userCoupon != null && !userCoupon.isUsed()) {
			userCoupon.setUsed(true);
            userCouponRepository.save(userCoupon);
		} else {
			throw new IllegalArgumentException("優惠券無效或已使用");
		}
	}
	
	@Transactional
	public void createCoupon(String code, String name, String discountType, int discountValue, String expiryDate) {
	    // 檢查優惠券是否已經存在
	    Coupon existingCoupon = couponRepository.findCouponByCode(code);
	    if (existingCoupon != null) {
	        throw new IllegalArgumentException("優惠券代碼已存在");
	    }

	    // 創建新的優惠券
	    Coupon coupon = new Coupon();
	    coupon.setCode(code);
	    coupon.setName(name);
	    coupon.setDiscountValue(discountValue);

	    // 轉換日期字串為 LocalDate
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    LocalDate formattedExpiryDate = LocalDate.parse(expiryDate, formatter);
	    coupon.setExpiryDate(formattedExpiryDate);

	    // 清理傳入的 discountType（移除空白或逗號）
	    String cleanedDiscountType = discountType.trim().split(",")[0].toLowerCase();  // 只取第一個有效值並轉成小寫

	    // 設置折扣類型
	    try {
	        coupon.setDiscountType(DiscountType.valueOf(cleanedDiscountType));
	    } catch (IllegalArgumentException e) {
	        throw new IllegalArgumentException("無效的折扣類型：" + discountType);
	    }

	    // 儲存優惠券
	    couponRepository.save(coupon);
	}


	   	// 查詢所有優惠券
		public List<Coupon> getAllCoupons() {
	        return couponRepository.findAll();
	    }
		
		// 發送優惠券給所有用戶
		 public void issueCouponToAllUsers(long couponId) {
		        // 查詢所有用戶
		        List<User> users = userRepository.findAll();

		        // 查找指定的優惠券
		        Coupon coupon = couponRepository.findById(couponId).orElseThrow(() -> new IllegalArgumentException("優惠券不存在"));

		        // 發放優惠券
		        for (User user : users) {
		            // 檢查用戶是否已經擁有這張優惠券
		            if (!userCouponRepository.existsByUserIdAndCouponId(user.getUserId(), couponId)) {
		                UserCoupon userCoupon = new UserCoupon();
		                userCoupon.setUserId(user.getUserId());
		                userCoupon.setCouponId(coupon.getCouponId());
		                userCoupon.setUsed(false);  // 表示尚未使用
		                userCouponRepository.save(userCoupon);
		            }
		        }
		    }
		
		 
}
