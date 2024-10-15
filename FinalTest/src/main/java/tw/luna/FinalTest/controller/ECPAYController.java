package tw.luna.FinalTest.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tw.luna.FinalTest.dto.PostMerchantDto;
import tw.luna.FinalTest.dto.QueryOrderDTO;
import tw.luna.FinalTest.dto.orders.MerchantByUserDto;
import tw.luna.FinalTest.service.ECPAYService;

import java.io.IOException;

@RestController
@RequestMapping ("/api/ECPAY")

public class ECPAYController {

    @Autowired
    ECPAYService ecpayService;

    @PostMapping("/ecpayCheckout")
    public String ecpayCheckout(HttpServletResponse response,
                                @RequestBody PostMerchantDto postMerchantDto) throws IOException {
        String aioCheckOutALLForm = ecpayService.ecpayCheckout(postMerchantDto);
        return aioCheckOutALLForm;
    }

    @PostMapping("/queryOrder")
    public String queryOrder(HttpServletResponse response,
                             @RequestBody QueryOrderDTO queryOrderDTO) throws IOException {
        return ecpayService.queryOrder(queryOrderDTO);
    }

    @PutMapping("/changeOrderStatus")
    public String changeOrderStatus(@RequestBody MerchantByUserDto merchantNo) {
        return  ecpayService.changeOrderStatus(merchantNo.getMerchantNo());
    }


}
