package tw.luna.FinalTest.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tw.luna.FinalTest.model.Cart;
import tw.luna.FinalTest.model.CartItems;
import tw.luna.FinalTest.model.Product;

public interface CartItemsRepository extends JpaRepository<CartItems,Long> {

    //刪除購物車內某項商品      刪除商品 透過 商品裡的商品ID
//    void deleteByProductProductId(Integer productId);

    //刪除購物車內所有商品 (使用場景 ->提交訂單後清空購物車)
    void deleteByCartCartId(Integer cartId);
    
//    // 把cart跟cartitem併在一起，供order獲取 
//    @Query("SELECT c, ci FROM Cart c JOIN CartItems ci ON c.cartId = ci.cart.cartId WHERE c.cartId = :cartId")
//    List<Object[]> findCartWithItems(@Param("cartId") Integer cartId);

    // 查詢購物車內是否已有該商品 (使用場景->使用者將某項商品加入購物車 ->判斷該商品是否已存在於購物車  是->修改數量；否->新增商品
    @Query("SELECT ci FROM CartItems ci WHERE ci.cart = :cart AND ci.product = :product")
    CartItems isCartItemInCart(@Param("cart") Cart cart, @Param("product") Product product);

    // 查詢購物車內的特定商品 (使用場景 -> 使用者刪除購物車內商品)
//    @Query("SELECT ci FROM CartItems ci WHERE ci.cart.cartId = :cartId AND ci.product.productId = :productId")
//    CartItems findByCartCartIdAndProductProductId(@Param("cartId") Integer cartId, @Param("productId") Long productId);
    @Query("SELECT ci FROM CartItems ci JOIN ci.cart c WHERE c.cartId = :cartId AND ci.product.name = :name")
    CartItems findByCartCartIdAndProductName(@Param("cartId") Integer cartId, @Param("name") String name);

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

