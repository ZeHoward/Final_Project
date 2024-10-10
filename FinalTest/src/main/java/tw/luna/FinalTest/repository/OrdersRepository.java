package tw.luna.FinalTest.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tw.luna.FinalTest.dto.OrdersDTO;
import tw.luna.FinalTest.dto.orders.MerchantByUserDto;
import tw.luna.FinalTest.model.OrderDetails;
import tw.luna.FinalTest.model.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	
	Page<Orders> findAll(Pageable pageable);
	
	@Query("SELECT o FROM Orders o JOIN FETCH o.user")
    Page<Orders> findAllWithUser(Pageable pageable);
	
	Page<Orders> findByStatus(String status, Pageable pageable);

	// 查詢某個時間範圍內的營業額總和 (周、月、年)
	@Query("SELECT SUM(o.finalAmount - 160) FROM Orders o WHERE o.orderDate >= :startDate AND o.orderDate <= :endDate AND o.status = 'completed'")
	Integer findTotalRevenueWithinPeriod(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

	// 查訂單總額
	@Query("SELECT COUNT(o) FROM Orders o WHERE o.orderDate BETWEEN :startDate AND :endDate AND o.status = 'completed'")
	Integer countOrdersWithinPeriod(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

	// 查詢每日的營業額
	@Query("SELECT new map(FUNCTION('DATE', o.orderDate) AS orderDate, SUM(COALESCE(o.finalAmount, 0) - 160) AS totalRevenue) " +
			"FROM Orders o " +
			"WHERE o.orderDate BETWEEN :startDate AND :endDate AND o.status = 'completed' " +
			"GROUP BY FUNCTION('DATE', o.orderDate) " +
			"ORDER BY FUNCTION('DATE', o.orderDate)")
	List<Map<String, Object>> aggregateRevenueByDay(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);


	// 查詢每月的營業額
	@Query("SELECT new map(FUNCTION('YEAR', o.orderDate) AS orderYear, FUNCTION('MONTH', o.orderDate) AS orderMonth, " +
			"SUM(COALESCE(o.finalAmount, 0) - 160) AS totalRevenue) " +
			"FROM Orders o " +
			"WHERE o.orderDate BETWEEN :startDate AND :endDate AND o.status = 'completed' " +
			"GROUP BY FUNCTION('YEAR', o.orderDate), FUNCTION('MONTH', o.orderDate) " +
			"ORDER BY FUNCTION('YEAR', o.orderDate), FUNCTION('MONTH', o.orderDate)")
	List<Map<String, Object>> aggregateRevenueByMonth(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);



	// 查詢每年的營業額
	@Query("SELECT YEAR(o.orderDate) AS orderYear, SUM(COALESCE(o.finalAmount, 0) - 160) AS totalRevenue " +
			"FROM Orders o " +
			"WHERE o.orderDate BETWEEN :startDate AND :endDate AND o.status = 'completed' " +
			"GROUP BY YEAR(o.orderDate) " +
			"ORDER BY YEAR(o.orderDate) ASC")
	List<Map<String, Object>> aggregateRevenueByYear(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

	// 抓到order, orderDetails 的column
    @Query(value = "SELECT o.orderId, o.userId, o.cartId, o.couponId, o.orderDate, " +
            "o.totalAmount, o.percentageDiscount, o.amountDiscount, o.finalAmount, " +
            "o.status, o.Address, od.productId, od.quantity, od.price " +
            "FROM orders o " +
            "JOIN orderdetails od ON o.orderId = od.orderId", nativeQuery = true)
    List<Object[]> findOrderDetailsWithJoin();

	@Query("SELECT o FROM Orders o WHERE o.orderDate >= :startDate AND o.status = 'completed'")
	List<Orders> findOrdersAfterDate(@Param("startDate") LocalDateTime startDate);

	List<Orders> findByOrderDateGreaterThanEqualAndStatus(LocalDateTime startDate, String status);
	
	List<Orders> findByUser_UserId(Long userId);
	Optional<Orders> findByOrderIdAndUser_UserId(Integer orderId, Long userId);
    
	@Query("SELECT new tw.luna.FinalTest.dto.OrdersDTO(o.orderId, o.orderDate, o.address, o.totalAmount, " +
	           "CASE WHEN o.coupon IS NULL THEN null ELSE o.coupon.code END, " +
	           "o.percentageDiscount, o.amountDiscount, o.finalAmount, o.status) " +
	           "FROM Orders o WHERE o.user.userId = :userId")
	    List<OrdersDTO> findOrdersDTOByUserId(@Param("userId") Long userId);
	
//	@Query(value ="SELECT * FROM orders o WHERE o.userId = :userId", nativeQuery = true)
	List<Orders> findByUserUserId(Long userId);

	//wen
	@Query("SELECT o FROM Orders o JOIN o.payment p WHERE p.merchantNo = :merchantNo")
	Orders findByMerchantNo(String merchantNo);

}
