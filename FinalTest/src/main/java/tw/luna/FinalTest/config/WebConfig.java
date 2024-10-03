package tw.luna.FinalTest.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private EnjoyumInterceptor enjoyumInterceptor;


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(enjoyumInterceptor)
        		
        		//需登入才能訪問的網址
                .addPathPatterns("/memberCenterPage", "/memberBasicInfoPage", "/updatePasswordPage", "/couponPage", "/orderPage", "/orderDetailPage", "/myCollection", "/myOrderList", "/myOrder/detail")
                
                //無需登入也能訪問的網址,不設置也可以
                .excludePathPatterns("/loginPage", "/registPage");  
    }
}
