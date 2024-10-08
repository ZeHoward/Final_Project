package tw.luna.FinalTest.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tw.luna.FinalTest.dto.cart.CartInsertDto;
import tw.luna.FinalTest.dto.cart.CartSelectDto;
import tw.luna.FinalTest.model.Cart;
import tw.luna.FinalTest.service.CartService;

import java.util.List;

@RequestMapping("/api/cart")
@RestController
public class CartController {

    @Autowired
    CartService cartService;

    //透過userId查詢購物車Id
    @GetMapping("/getCartId/{userId}")
    public Cart getCartId(@PathVariable Long userId){
        return cartService.getCartIdByUserId(userId);
    }

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

    //加入購物車(新增或更新)，購物車內未存在該商品->新增；已存在->修改數量
    @PutMapping("/put/{userId}")
    public ResponseEntity<String> updateCart(@PathVariable Long userId, @RequestBody CartInsertDto cartInsertDto) {
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
    public ResponseEntity<String> deleteCartItemsByProductId(@PathVariable Long userId, @PathVariable String name) {
        cartService.deleteCartItemsByProductId(userId, name);

        return ResponseEntity.ok("成功刪除該商品");
    }
}
