package tw.luna.FinalTest.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tw.luna.FinalTest.dto.cart.CartInsertDto;
import tw.luna.FinalTest.dto.cart.CartSelectDto;
import tw.luna.FinalTest.service.CartService;

import java.util.List;

@RequestMapping("/api/cart")
@RestController
public class CartController {
    Long userId = 1L; // 假設用戶 ID 固定為 1，實際情況應根據需求調整

    @Autowired
    CartService cartService;

    @PostMapping("/{userId}")
    public ResponseEntity<String> addToCart(@PathVariable Long userId, @RequestBody CartInsertDto cartInsertDto) {
        cartService.addToCart(cartInsertDto, userId);
        return ResponseEntity.ok("Successfully added/updated product in the cart");
    }

    //查詢購物車
    //顯示用戶購物車items
    @GetMapping("/{userId}")
    public List<CartSelectDto> getCartItems(@PathVariable Long userId) {
        return cartService.getCartItemsByUserId(userId);
    }

    //加入購物車(新增或更新)，購物車內未存在該商品->新增；已存在->修改數量
    @PutMapping("/put/{userId}")
    public ResponseEntity<String> updateCart(@PathVariable Long userId, @RequestBody CartInsertDto cartInsertDto){
        cartService.updateCart(cartInsertDto, userId);
        return ResponseEntity.ok("成功將商品加入購物車");
    }

    //清空購物車
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteAllCartItems(@PathVariable Long userId) {
        cartService.deleteAllCartItems(userId);
        return ResponseEntity.ok("成功清空購物車");
    }

    //刪除購物車某項商品
    @DeleteMapping("/delete/{userId}/{name}")
    public ResponseEntity<String> deleteCartItemsByProductId(@PathVariable Long userId,@PathVariable String name){
        cartService.deleteCartItemsByProductId(userId,name);

        return ResponseEntity.ok("成功刪除該商品");
    }


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