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

    //新增商品進購物車 購物車內未存在該商品->新增；已存在->累加數量
    @PostMapping("/{userId}")
    public ResponseEntity<String> addToCart(@PathVariable Long userId, @RequestBody CartInsertDto cartInsertDto) {
        cartService.addToCart(cartInsertDto, userId);
        return ResponseEntity.ok("成功加入商品至購物車");
    }

    //查詢購物車
    //顯示用戶購物車items
    @GetMapping("/{userId}")
    public List<CartSelectDto> getCartItems(@PathVariable Long userId) {
        return cartService.getCartItemsByUserId(userId);
    }

    //購物車 修改數量
    @PutMapping("/put/{userId}")
    public ResponseEntity<String> updateCart(@PathVariable Long userId, @RequestBody CartInsertDto cartInsertDto){
        cartService.updateCart(cartInsertDto, userId);
        return ResponseEntity.ok("成功更新購物車商品數量");
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
