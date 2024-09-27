package tw.luna.FinalTest.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw.luna.FinalTest.dto.orders.OrdersInsertDto;
import tw.luna.FinalTest.service.OrdersService;


@RequestMapping("/api/orders")
@RestController
public class OrdersController {
    Long userId = 1L; // 假設用戶 ID 固定為 1，實際情況應根據需求調整

    @Autowired
    OrdersService ordersService;

    // 提交購物車商品->訂單
    @PostMapping ("/{userId}")
    public ResponseEntity<String> addToOrders(@RequestBody OrdersInsertDto ordersInsertDto, @PathVariable Long userId) {
        ordersService.insertOrder(ordersInsertDto,userId);
        return ResponseEntity.ok("成功新增訂單");
    }
}
