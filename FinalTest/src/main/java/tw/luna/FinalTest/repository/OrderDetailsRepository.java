package tw.luna.FinalTest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.luna.FinalTest.model.OrderDetails;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {
	
	List<OrderDetails> findByOrdersOrderId(Integer orderId);
	
}
