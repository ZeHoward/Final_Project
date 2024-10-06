package tw.luna.FinalTest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tw.luna.FinalTest.dto.orders.MerchantByUserDto;
import tw.luna.FinalTest.model.Cart;
import tw.luna.FinalTest.model.Payment;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Query("SELECT new tw.luna.FinalTest.dto.orders.MerchantByUserDto(p.merchantNo)\n" +
            "FROM Payment p\n" +
            "JOIN p.orders o\n" +
            "JOIN o.user u\n" +
            "WHERE u.userId = :userId")
    List<MerchantByUserDto> findMerchantNoByUsersUserId(Long userId);
}
