package tw.luna.FinalTest.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tw.luna.FinalTest.Dto.CouponDTO;
import tw.luna.FinalTest.Dto.UserCouponDTO;
import tw.luna.FinalTest.model.Coupon;
import tw.luna.FinalTest.model.DiscountType;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.model.UserCoupon;
import tw.luna.FinalTest.repository.CouponRepository;
import tw.luna.FinalTest.repository.UserCouponRepository;
import tw.luna.FinalTest.repository.UsersRepository;
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


	public Coupon validateCoupon(String code, long userId) {
		// 根据代号查找优惠券
		Coupon coupon = couponRepository.findCouponByCode(code);

		if (coupon == null) {
			throw new IllegalArgumentException("優惠券不存在");
		}

		// 检查优惠券是否启用
		if (!coupon.isActive()) {
			throw new IllegalArgumentException("優惠券已被禁用");
		}

		// 检查优惠券是否已过期
		if (coupon.getExpiryDate().isBefore(LocalDate.now())) {
			throw new IllegalArgumentException("優惠券已過期");
		}

		// 检查用户是否拥有该优惠券
		UserCoupon userCoupon = userCouponRepository.findUserCouponByUserIdAndCouponId(userId, coupon.getCouponId());
		if (userCoupon == null) {
			throw new IllegalArgumentException("用戶沒有該優惠券");
		}

		// 检查优惠券是否已被使用
		if (userCoupon.isUsed()) {
			throw new IllegalArgumentException("優惠券已被使用");
		}

		return coupon; // 优惠券有效
	}




	// 發放優惠券給用戶
	public void issueCouponToUser(long userId, String couponCode) {
		Coupon coupon = couponRepository.findCouponByCode(couponCode);

		if (coupon == null || coupon.getExpiryDate().isBefore(LocalDate.now())) {
			throw new IllegalArgumentException("優惠券無效或已過期");
		}

		// 检查優惠券是否啟用
		if (!coupon.isActive()) {
			throw new IllegalArgumentException("優惠券已被禁用");
		}

		// 檢查用戶是否已擁有優惠券
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

		// 转换为 UserCouponDTO 并返回
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

		// 检查优惠券是否启用
		Coupon coupon = couponRepository.findById(couponId)
				.orElseThrow(() -> new IllegalArgumentException("優惠券不存在"));

		if (!coupon.isActive()) {
			throw new IllegalArgumentException("優惠券已被禁用");
		}

		userCoupon.setUsed(true);
		userCouponRepository.save(userCoupon);
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
		coupon.setActive(true);

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

		
		// 發送優惠券給所有用戶
		@Transactional
		public void issueCouponToAllUsers(long couponId) {
			// 查找指定的优惠券
			Coupon coupon = couponRepository.findById(couponId)
					.orElseThrow(() -> new IllegalArgumentException("優惠券不存在"));

			// 查詢所有用户
			List<Users> users = userRepository.findAll();

			// 先批量查找所有已经拥有该优惠券的用户
			List<Long> existingUserIds = userCouponRepository.findUserIdsByCouponId(couponId);

			// 过滤出尚未拥有该优惠券的用户
			List<Users> usersToIssueCoupon = users.stream()
					.filter(user -> !existingUserIds.contains(user.getUserId()))
					.collect(Collectors.toList());

			// 构建要插入的 UserCoupon 对象列表
			List<UserCoupon> userCoupons = new ArrayList<>();
			for (Users user : usersToIssueCoupon) {
				UserCoupon userCoupon = new UserCoupon();
				userCoupon.setUserId(user.getUserId());
				userCoupon.setCouponId(coupon.getCouponId());
				userCoupon.setUsed(false);
				userCoupons.add(userCoupon);
			}

			// 批量保存到数据库
			userCouponRepository.saveAll(userCoupons);
		}




	// 管理员查看所有优惠券
	public List<Coupon> getAllCoupons() {
		return couponRepository.findAll(); // 包括禁用的优惠券
	}




	// 切换优惠券的启用/禁用状态
	@Transactional
	public Coupon toggleCouponStatus(long couponId) {
		Coupon coupon = couponRepository.findById(couponId)
				.orElseThrow(() -> new IllegalArgumentException("優惠券不存在"));

		// 切換優惠券狀態
		coupon.setActive(!coupon.isActive());

		// 確保將修改後的優惠券狀態保存到資料庫
		couponRepository.save(coupon);

		// 返回更新後的優惠券對象
		return coupon;
	}




}
