package tw.luna.FinalTest.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import jakarta.servlet.http.HttpSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MyWebSocketHandler extends TextWebSocketHandler {

    // 用來存儲使用者的 WebSocketSession
    private Map<String, WebSocketSession> sessions = new HashMap<>();
    
    @Autowired
    private HttpSession httpSession;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 從 WebSocket session attributes 中取出 HttpSession
    	HttpSession httpSession = (HttpSession) session.getAttributes().get("HTTP_SESSION");
        if (httpSession != null) {
            // 從 HttpSession 中取得使用者的 ID 或者其他身份識別信息
            String userId = (String) httpSession.getAttribute("userId");
            sessions.put(userId, session);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 處理收到的消息
        String payload = message.getPayload();
        
        // 假設我們的消息格式是 JSON，包含接收方的ID
        String recipientId = getRecipientIdFromMessage(payload);
        System.out.println("handleText.payload:" + payload);
        System.out.println("handleText.recipientId:" + recipientId);

        // 根據接收方ID找到對應的WebSocket連接
        WebSocketSession recipientSession = sessions.get(recipientId);
        if (recipientSession != null && recipientSession.isOpen()) {
            recipientSession.sendMessage(new TextMessage("Message from user: " + payload));
        }

        // 保存聊天記錄到數據庫
        saveChatMessage(session, recipientId, payload);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        HttpSession httpSession = (HttpSession) session.getAttributes().get("HTTP_SESSION");
        if (httpSession != null) {
            String userId = (String) httpSession.getAttribute("userId");
            sessions.remove(userId);
        }
    }

    // 假設這裡是解析 JSON 消息，取得接收方的ID
    private String getRecipientIdFromMessage(String payload) {
        // 可以使用類似於 JSON 解析庫來處理消息
        return "admin"; // 範例：假設消息是發送給管理員
    }

    // 假設這裡保存聊天記錄到數據庫
    private void saveChatMessage(WebSocketSession session, String recipientId, String message) {
        // 保存到數據庫的邏輯
    }
}

