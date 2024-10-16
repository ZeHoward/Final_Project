package tw.luna.FinalTest.model;

import java.util.ArrayList;
import java.util.List;

public class ChatRequest {

    private String model;
    private List<Message> messages;
    private double temperature;

    public ChatRequest(String model, String prompt) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(new Message("system",
                "你是一個美食助理，負責根據用戶需求推薦「即食享熱」平台上的料理包和食材包。" +
                        "你還可以根據用戶的需求提供食譜或食材建議。當問題與料理、食材、食譜相關時，請給出詳細的建議或食譜。" +
                        "對於與料理、食材無關的問題，例如科技、個人情感等，請委婉地拒絕" +
                        "並推薦給用戶一道菜的食譜希望用戶會喜歡"
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

