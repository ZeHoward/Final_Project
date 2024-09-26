package com.NewTestApi.EatFun.Controller;


import com.NewTestApi.EatFun.Dto.CartInsertDto;
import com.NewTestApi.EatFun.Dto.CartSelectDto;
import com.NewTestApi.EatFun.Dto.CartUpdateDto;
import com.NewTestApi.EatFun.Entity.CartItems;
import com.NewTestApi.EatFun.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/cart")
@RestController
public class CartController {
    Long userId = 1l; // 假設用戶 ID 固定為 1，實際情況應根據需求調整

    @Autowired
    CartService cartService;

    //從服務層獲取指定用戶的購物車項目
    //顯示用戶購物車items
    @GetMapping("/{userId}")
    public List<CartItems> getCartItems(@PathVariable Long userId) {
        return cartService.getCartItemsByUserId(userId);
    }

//    // 新增購物車
//    @PostMapping
//    public ResponseEntity<String> addToCart(@RequestBody CartInsertDto cartInsertDto) {
//        cartService.insertCart(cartInsertDto);
//        return ResponseEntity.ok("成功新增購物車");
//    }
//
//    @DeleteMapping("/{userId}/{itemId}")
//    public ResponseEntity<String> deleteCartItem(@PathVariable Long userId,
//                                                 @PathVariable Long itemId) {
//        cartService.deleteCartItem(userId, itemId);
//        return ResponseEntity.ok("成功刪除單一購物車品項");
//    }
//
//    @DeleteMapping("/{usersId}")
//    public ResponseEntity<String> deleteAllCartItems(@PathVariable Long usersId) {
//        cartService.deleteAllCartItems(usersId);
//        return ResponseEntity.ok("成功清空購物車");
//    }
//
//    @PutMapping("/{cartItemId}")
//    public ResponseEntity<String> updateCartItem(
//            @PathVariable Long cartItemId,
//            @RequestBody CartUpdateDto cartUpdateDto) {
//        cartService.updateCartItem(cartItemId, cartUpdateDto);
//        return ResponseEntity.ok("Cart item updated successfully");
//    }
//

}
