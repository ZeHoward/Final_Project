package tw.luna.FinalTest.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tw.luna.FinalTest.model.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	
	Page<Orders> findAll(Pageable pageable);
	
	@Query("SELECT o FROM Orders o JOIN FETCH o.user")
    Page<Orders> findAllWithUser(Pageable pageable);
	
	// 查詢某個時間範圍內的營業額總和 (周、月、年)
    @Query("SELECT SUM(o.finalAmount) FROM Orders o WHERE o.orderDate >= :startDate AND o.orderDate <= :endDate")
    Integer findTotalRevenueWithinPeriod(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(o) FROM Orders o WHERE o.orderDate BETWEEN :startDate AND :endDate")
    Integer countOrdersWithinPeriod(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

}
