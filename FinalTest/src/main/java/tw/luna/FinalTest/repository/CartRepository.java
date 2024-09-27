package tw.luna.FinalTest.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tw.luna.FinalTest.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUsersUserId(Long userId);




    // 將 cartId 對應的購物車每一個清單列出後數量乘以價格並加總

// 將 cartId 對應的購物車每一個清單列出後數量乘以價格並加總
//    @Query("SELECT SUM(ci.quantity * ci.price) FROM CartItems ci WHERE ci.cartId = :cartId")
//    Integer calculateTotalPrice(@Param("cartId") Integer cartId);

    // 根據 userId 查找 Cart
//    Cart findByUsersId(Long userId);
}
