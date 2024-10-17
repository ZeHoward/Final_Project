package tw.luna.FinalTest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.luna.FinalTest.dto.orders.MerchantByUserDto;
import tw.luna.FinalTest.model.Pay;
import tw.luna.FinalTest.model.Payment;
import tw.luna.FinalTest.repository.PaymentRepository;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    PaymentRepository paymentRepository;


    public List<String> findAllPayments(Long userId) {
       List<String> paymentList = paymentRepository.findMerchantNoByUsersUserId(userId);
        return paymentList;
    }
}
