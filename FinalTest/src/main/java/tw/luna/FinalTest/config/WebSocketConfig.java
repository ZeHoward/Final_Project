package tw.luna.FinalTest.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistration;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;


@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // 註冊WebSocket處理器
        WebSocketHandlerRegistration setAllowedOrigins = registry
        		.addHandler(new MyWebSocketHandler(), "/ws/chat")
        		.addInterceptors(new HttpSessionHandshakeInterceptor())
        		.setAllowedOrigins("*");
    }
}
