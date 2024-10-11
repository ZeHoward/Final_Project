package tw.luna.FinalTest.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tw.luna.FinalTest.dto.CouponDTO;
import tw.luna.FinalTest.dto.UserCouponDTO;
import tw.luna.FinalTest.model.Coupon;
import tw.luna.FinalTest.model.DiscountType;
import tw.luna.FinalTest.model.UserCoupon;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.repository.CouponRepository;
import tw.luna.FinalTest.repository.UserCouponRepository;
import tw.luna.FinalTest.repository.UsersRepository;

@Service
public class CouponService {

	private final CouponRepository couponRepository;
	private final UserCouponRepository userCouponRepository;
	private final UsersRepository userRepository;


	public CouponService(CouponRepository couponRepository, UserCouponRepository userCouponRepository, UsersRepository userRepository) {
		this.couponRepository = couponRepository;
		this.userCouponRepository = userCouponRepository;
		this.userRepository = userRepository;
	}

	// 驗證優惠券
	public Coupon validateCoupon(String code, long userId) {
		Coupon coupon = couponRepository.findCouponByCode(code);

		if (coupon == null) {
			throw new IllegalArgumentException("優惠券不存在");
		}

		if (!coupon.isActive()) {
			throw new IllegalArgumentException("優惠券已被禁用");
		}

		if (coupon.getExpiryDate().isBefore(LocalDate.now())) {
			throw new IllegalArgumentException("優惠券已過期");
		}

		UserCoupon userCoupon = userCouponRepository.findUserCouponByUserIdAndCouponId(userId, coupon.getCouponId());
		if (userCoupon == null) {
			throw new IllegalArgumentException("用戶沒有該優惠券");
		}

		if (userCoupon.isUsed()) {
			throw new IllegalArgumentException("優惠券已被使用");
		}

		return coupon;
	}

	// 發放優惠券給用戶
	public void issueCouponToUser(long userId, String couponCode) {
		Coupon coupon = couponRepository.findCouponByCode(couponCode);
		if (coupon == null || coupon.getExpiryDate().isBefore(LocalDate.now())) {
			throw new IllegalArgumentException("優惠券無效或已過期");
		}

		if (!coupon.isActive()) {
			throw new IllegalArgumentException("優惠券已被禁用");
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
	public List<UserCouponDTO> getUserCoupons(long userId) {
		List<UserCoupon> userCoupons = userCouponRepository.findCouponsByUserId(userId);

		return userCoupons.stream()
				.map(userCoupon -> new UserCouponDTO(
						userCoupon.getUserId(),
						new CouponDTO(
								userCoupon.getCoupon().getCouponId(),
								userCoupon.getCoupon().getCode(),
								userCoupon.getCoupon().getName(),
								userCoupon.getCoupon().getDiscountType().name(),
								userCoupon.getCoupon().getDiscountValue(),
								userCoupon.getCoupon().getExpiryDate(),
								userCoupon.getCoupon().isActive()
						),
						userCoupon.isUsed()
				))
				.collect(Collectors.toList());
	}

	// 使用優惠券
	public void useCoupon(long userId, long couponId) {
		UserCoupon userCoupon = userCouponRepository.findUserCoupon(userId, couponId);

		if (userCoupon == null || userCoupon.isUsed()) {
			throw new IllegalArgumentException("優惠券無效或已使用");
		}

		Coupon coupon = couponRepository.findById(couponId)
				.orElseThrow(() -> new IllegalArgumentException("優惠券不存在"));

		if (!coupon.isActive()) {
			throw new IllegalArgumentException("優惠券已被禁用");
		}

		userCoupon.setUsed(true);
		userCouponRepository.save(userCoupon);
	}

	// 創建優惠券
	@Transactional
	public void createCoupon(String code, String name, String discountType, int discountValue, String expiryDate) {
		Coupon existingCoupon = couponRepository.findCouponByCode(code);
		if (existingCoupon != null) {
			throw new IllegalArgumentException("優惠券代碼已存在");
		}

		Coupon coupon = new Coupon();
		coupon.setCode(code);
		coupon.setName(name);
		coupon.setDiscountValue(discountValue);
		coupon.setActive(true);

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate formattedExpiryDate = LocalDate.parse(expiryDate, formatter);
		coupon.setExpiryDate(formattedExpiryDate);

		String cleanedDiscountType = discountType.trim().split(",")[0].toLowerCase();

		try {
			coupon.setDiscountType(DiscountType.valueOf(cleanedDiscountType));
		} catch (IllegalArgumentException e) {
			throw new IllegalArgumentException("無效的折扣類型：" + discountType);
		}

		couponRepository.save(coupon);
	}

	// 發送優惠券給所有用戶
	@Transactional
	public void issueCouponToAllUsers(long couponId) {
		Coupon coupon = couponRepository.findById(couponId)
				.orElseThrow(() -> new IllegalArgumentException("優惠券不存在"));

		List<Users> users = userRepository.findAll();

		List<Long> existingUserIds = userCouponRepository.findUserIdsByCouponId(couponId);

		List<Users> usersToIssueCoupon = users.stream()
				.filter(user -> !existingUserIds.contains(user.getUserId()))
				.toList();

		List<UserCoupon> userCoupons = new ArrayList<>();
		for (Users user : usersToIssueCoupon) {
			UserCoupon userCoupon = new UserCoupon();
			userCoupon.setUserId(user.getUserId());
			userCoupon.setCouponId(coupon.getCouponId());
			userCoupon.setUsed(false);
			userCoupons.add(userCoupon);
		}

		userCouponRepository.saveAll(userCoupons);
	}

	// 查看所有優惠券
	public List<Coupon> getAllCoupons() {
		return couponRepository.findAll();
	}

	// 切換優惠券狀態
	public Coupon toggleCouponStatus(long couponId) {
		Coupon coupon = couponRepository.findById(couponId)
				.orElseThrow(() -> new IllegalArgumentException("優惠券不存在"));

		coupon.setActive(!coupon.isActive());

		couponRepository.save(coupon);

		return coupon;
	}

	// 驗證優惠券並返回細節
	public Map<String, Object> validateCouponAndReturnDetails(String code, long userId) {
		Map<String, Object> response = new HashMap<>();
		try {
			Coupon coupon = validateCoupon(code, userId);
			response.put("success", true);
			response.put("message", "優惠券有效");
			response.put("discountType", coupon.getDiscountType());
			response.put("discountValue", coupon.getDiscountValue());
		} catch (IllegalArgumentException e) {
			response.put("success", false);
			response.put("message", e.getMessage());
		}
		return response;
	}

	// 切換優惠券狀態並返回細節
	public Map<String, Object> toggleCouponStatusAndReturnDetails(long couponId) {
		Map<String, Object> response = new HashMap<>();
		try {
			Coupon updatedCoupon = toggleCouponStatus(couponId);
			response.put("message", updatedCoupon.isActive() ? "優惠券已啟用" : "優惠券已禁用");
			response.put("coupon", updatedCoupon);
		} catch (IllegalArgumentException e) {
			response.put("error", e.getMessage());
		}
		return response;
	}
}
