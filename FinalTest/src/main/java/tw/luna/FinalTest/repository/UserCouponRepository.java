package tw.luna.FinalTest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;
import tw.luna.FinalTest.model.Coupon;
import tw.luna.FinalTest.model.UserCoupon;
import tw.luna.FinalTest.model.UserCouponId;

public interface UserCouponRepository extends JpaRepository<UserCoupon,UserCouponId>{
    List<UserCoupon> findCouponsByUserId(long userId); // 根據用戶ID查找所有優惠券
    
    @Query("SELECT uc FROM UserCoupon uc WHERE uc.userId = ?1 AND uc.couponId = ?2")
    UserCoupon findUserCoupon(long userId, long l); // 查找特定用戶擁有的特定優惠券
	UserCoupon save(UserCoupon userCoupon); // 儲存新的用戶優惠券

	UserCoupon findUserCouponByUserIdAndCouponId(long userId, long couponId);

	boolean existsByUserIdAndCouponId(Long userId, long couponId);


    @Query("SELECT uc.userId FROM UserCoupon uc WHERE uc.couponId = :couponId")
    List<Long> findUserIdsByCouponId(@Param("couponId") long couponId);

}
