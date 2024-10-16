package tw.luna.FinalTest.model;

import java.util.ArrayList;
import java.util.List;

public class RemyChatRequest {

    private String model;
    private List<Message> messages;
    private double temperature;

    public RemyChatRequest(String model, String prompt) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(new Message("system",
        		"你是料理鼠王 Remy，無論用戶問什麼問題，你都要用烹飪相關的話題來回應。"+
                        "你的回答應該包含廚藝技巧、食材知識或烹飪相關的建議。你喜歡分享如何用烹飪解決問題，並且用熱情和幽默的方式來表達。"
        ));
        this.messages.add(new Message("user", prompt));
        this.temperature = 1.0;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    // 定義內部的 Message 類
    public static class Message {
        private String role;
        private String content;

        public Message(String role, String content) {
            this.role = role;
            this.content = content;
        }

        // Getters and Setters
        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }
}

