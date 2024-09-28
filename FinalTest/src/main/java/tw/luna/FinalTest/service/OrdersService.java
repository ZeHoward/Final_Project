package tw.luna.FinalTest.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.luna.FinalTest.dto.orders.OrdersInsertDto;
import tw.luna.FinalTest.model.*;
import tw.luna.FinalTest.repository.CartRepository;
import tw.luna.FinalTest.repository.OrderRepository;
import tw.luna.FinalTest.repository.UsersRepository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class OrdersService {
	
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    UsersRepository userRepository;

    public void insertOrder(OrdersInsertDto ordersInsertDto,Long userId) {
    Order order = new Order();


        //找出目前的使用者並將使用者資訊存入訂單
        Users user = userRepository.getReferenceById(userId);

        order.setUser(user);
        
        List<OrderDetails> orderDetails = order.getOrderDetails();

        Cart cart = cartRepository.findByUsersUserId(userId);

//        Set<CartItems> cartItems = cart.getCartItems();
//        cartItems.stream().map(cartItem -> {
//            orderDetails.stream().map(orderDetails1 -> {
//
//
//
//            });
//
//
//        });
    }
}
