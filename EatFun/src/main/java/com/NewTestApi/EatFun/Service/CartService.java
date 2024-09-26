package com.NewTestApi.EatFun.Service;


import com.NewTestApi.EatFun.Dto.CartInsertDto;
import com.NewTestApi.EatFun.Dto.CartSelectDto;
import com.NewTestApi.EatFun.Dto.CartUpdateDto;
import com.NewTestApi.EatFun.Entity.Cart;
import com.NewTestApi.EatFun.Entity.CartItems;
import com.NewTestApi.EatFun.Entity.Product;
import com.NewTestApi.EatFun.Entity.ProductImage;
import com.NewTestApi.EatFun.Repository.CartItemsRepository;
import com.NewTestApi.EatFun.Repository.CartRepository;
import com.NewTestApi.EatFun.Repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    CartItemsRepository cartItemsRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductRepository productRepository;





//根據用戶 ID 獲取該用戶的購物車項目
    public List<CartItems> getCartItemsByUserId(Long userId) {
        Cart cart = cartRepository.findByUsersUserId(userId);
        List<CartSelectDto> cartSelectDtos = cart.getCartItems().stream().map(cartItem ->
                {
                    Product product = cartItem.getProduct();
                    List<ProductImage> productImageList = product.getProductImage().stream().collect(Collectors.toList());
                    byte[] image = product.getProductImage().stream()
                            .findFirst() // 取第一張圖片
                            .map(ProductImage::getImage) // 假設getImage()返回byte[]
                            .orElse(null); // 如果沒有圖片，則為null
                    return
                new CartSelectDto(cartItem.getCartitemsId(), cartItem.getPrice(), cartItem.getQuantity(),
                        product.getName(), image);
    }

        ).collect(Collectors.toList());

        System.out.println(cartSelectDtos);


        return cartItemsRepository.findAll();
    }

//    @Transactional
//    public void insertCart(CartInsertDto cartInsertDto) {
//
//        //用dto中的userId找出在資料庫中對應的購物車
//        Cart cart = cartRepository.findByUsersId(cartInsertDto.getUsersId());
//        //用dto中的productId找出對應的Product
//        Product product = productRepository.findById(cartInsertDto.getProductId()).orElseThrow(() -> new EntityNotFoundException("Product not found"));
//        //用products_id資訊查是否有這個CartItem
//        Optional<CartItems> existingCartItem = cartItemsRepository.findByProductId(product.getProductId());
//        //如果有，修改後存入 若沒有．新建一個購物清單實體 準備存入資料庫
//        if (existingCartItem.isPresent()) {
//            CartItems cartItem = existingCartItem.get();
//            cartItem.setQuantity(cartItem.getQuantity() + cartInsertDto.getQuantity());
//            cartItem.setPrice(cartInsertDto.getPrice()); // 更新價格，如果需要的話
//            cartItemsRepository.save(cartItem);
//        } else {
//            // 創建新的CartItems 並用自訂建構式處理存入
//            CartItems newCartItem = new CartItems(
//                    cart,
//                    product,
//                    cartInsertDto.getQuantity(),
//                    cartInsertDto.getPrice()
//            );
//            cartItemsRepository.save(newCartItem);
//        }
//        //如果productId存在 改為update 並增加quantity
//
//        //修改購物車中的金額
////        updateCartTotalAndTime(cart);
//        cart.setTotal(cartRepository.calculateTotalPrice(cart.getCartId()));
//        cartRepository.save(cart);
//    }
//
//    @Transactional
//    public void deleteCartItem(Long userId, Long itemId) {
//        CartItems cartItem = cartItemsRepository.findByIdAndCart_Users_Id(itemId, userId)
//                .orElseThrow(() -> new ResourceNotFoundException("購物車品項不存在或不屬於該用戶"));
//        cartItemsRepository.delete(cartItem);
//
//        //取得cartId
//        Integer cartId = cartItem.getCart().getCartId();
//        //用cart中的關聯users_id找到cart
//        Cart cart = cartRepository.findByUsersId(userId);
//        //刪除後要重新計算
//        Integer newTotal = cartRepository.calculateTotalPrice(cartId);
//        cart.setTotal(newTotal);
//        cartRepository.save(cart);
//    }
//
//    @Transactional
//    public void deleteAllCartItems(Long usersId) {
//        Cart cart = cartRepository.findByUsersId(usersId);
//        cartItemsRepository.deleteByCartId(cart.getCartId());
//        //清空購物車後把cart的total歸零
//        cart.setTotal(0);
//        cart.setTotalQuantity(0);
//        cartRepository.save(cart);
//    }
//
//    @Transactional
//    public void updateCartItem(Long cartItemId, CartUpdateDto cartUpdateDto) {
//        CartItems cartItem = cartItemsRepository.findById(cartItemId)
//                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
//
//        cartItem.setQuantity(cartUpdateDto.getQuantity());
//         cartItemsRepository.save(cartItem);
//
//        // Update the cart's total price
//        Cart cart = cartItem.getCart();
//        cart.setTotal(cartRepository.calculateTotalPrice(cart.getCartId()));
//        cartRepository.save(cart);
//    }
}










