package tw.luna.FinalTest.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tw.luna.FinalTest.model.CartItems;

public interface CartItemsRepository extends JpaRepository<CartItems,Long> {
    void deleteByCartCartId(Integer cartId);
    
//    // 把cart跟cartitem併在一起，供order獲取 
//    @Query("SELECT c, ci FROM Cart c JOIN CartItems ci ON c.cartId = ci.cart.cartId WHERE c.cartId = :cartId")
//    List<Object[]> findCartWithItems(@Param("cartId") Integer cartId);

//    List<CartItems> findCartItemsByCartId(Long cartId);  //透過cartId找到catrItem
//    Optional<CartItems> findByProductId(Integer productId);     //透過ProductId找到catrItem
//
//
//    void deleteByCartId(Integer userId);
//
//    Optional<CartItems> findByCartitemsIdAndCart_Users_Id(Integer cartitemsId, Long userId); //根據cartitemID和userId 查找特定的cartitem

//    @Query("SELECT new com.NewTestApi.EatFun.Dto.CartSelectDto(ci.cartItemsId, p.price, ci.quantity, p.name, pi.image) " +
//            "FROM cartitems ci " +
//            "JOIN ci.cart c " +
//            "JOIN ci.products p " +
//            "JOIN p.productimages pi " +
//            "WHERE c.users.userId = :userId")
//    List<CartSelectDto> findByCart_User_Id(@Param("userId") Long userId);  //測試

}

