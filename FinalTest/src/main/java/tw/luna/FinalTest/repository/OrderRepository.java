package tw.luna.FinalTest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tw.luna.FinalTest.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
	
	Page<Order> findAll(Pageable pageable);
	
	@Query("SELECT o FROM Order o JOIN FETCH o.user")
    Page<Order> findAllWithUser(Pageable pageable);
}
