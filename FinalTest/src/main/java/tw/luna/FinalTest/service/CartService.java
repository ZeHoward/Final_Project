package tw.luna.FinalTest.service;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tw.luna.FinalTest.dto.cart.CartInsertDto;
import tw.luna.FinalTest.dto.cart.CartSelectDto;
import jakarta.transaction.Transactional;
import tw.luna.FinalTest.model.Cart;
import tw.luna.FinalTest.model.CartItems;
import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.repository.CartItemsRepository;
import tw.luna.FinalTest.repository.CartRepository;
import tw.luna.FinalTest.repository.ProductRepository;

import java.util.ArrayList;
import java.util.List;
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
    public List<CartSelectDto> getCartItemsByUserId(Long userId) {
        Cart cart = cartRepository.findByUsersUserId(userId);
        List<CartItems> cartItems = cart.getCartItems();
        List<CartSelectDto> result = new ArrayList<>(cartItems.size());

        for (CartItems cartItem : cartItems) {
            Product product = cartItem.getProduct();
            CartSelectDto dto = new CartSelectDto(
                    cartItem.getCartitemsId(),
                    cartItem.getPrice(),
                    cartItem.getQuantity(),
                    product.getName()
            );
            result.add(dto);
        }
        return result;
    }

    //將商品加入購物車 (新增或修改數量)
    @Transactional
    public void updateCart(CartInsertDto cartInsertDto, Long userId) {
        Cart cart = cartRepository.findByUsersUserId(userId);
        Product product = productRepository.findProductByName(cartInsertDto.getProductName());
        System.out.println(product);
        CartItems isPresent = cartItemsRepository.isCartItemInCart(cart, product);
        if(isPresent == null) {          //購物車內目前不存在該商品 ->新增
            CartItems cartItems = new CartItems();
            cartItems.setCart(cart);
            cartItems.setProduct(product);
            cartItems.setQuantity(Math.max(cartInsertDto.getQuantity(), 1));
            //單價
            cartItems.setPrice(product.getPrice());
            cartItemsRepository.save(cartItems);
        }else {  //購物車內已存在該商品 ->更新數量

            isPresent.setQuantity(Math.max(cartInsertDto.getQuantity(), 1));
            cartItemsRepository.save(isPresent);
        }
    }

    //清空購物車內的所有商品
    @Transactional
    public void deleteAllCartItems(Long userId) {
        Cart cart = cartRepository.findByUsersUserId(userId);
        cartItemsRepository.deleteByCartCartId(cart.getCartId());
    }

    //刪除購物車內某項商品
    @Transactional
    public void deleteCartItemsByProductId(Long userId, String name) {

        // 找到該用戶的購物車
        Cart cart = cartRepository.findByUsersUserId(userId);
        //找到購物車中的該商品
        CartItems isPresent = cartItemsRepository.findByCartCartIdAndProductName(name);

        if(isPresent != null)  { //商品存在
        //刪除商品
        cartItemsRepository.delete(isPresent);
         } else {
            throw new RuntimeException("購物車內無此商品");
        }
    }
}










