package tw.luna.FinalTest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import tw.luna.FinalTest.model.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Long>{
    Coupon findCouponByCode(String code); // 根據優惠券碼查找優惠券
    
    @Query("SELECT c FROM Coupon c WHERE c.expiryDate > CURRENT_DATE")
    List<Coupon> findAllValidCoupons(); // 尋找所有有效的優惠券
    void deleteById(long couponId); // 刪除優惠券
    @Query("SELECT c FROM Coupon c WHERE c.isActive = true AND c.expiryDate > CURRENT_DATE")
    List<Coupon> findAllValidAndActiveCoupons(); // 尋找所有有效且用的優惠券

}