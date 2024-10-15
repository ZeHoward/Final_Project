package tw.luna.FinalTest.service;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.InputStream;
@Service
public class FirebaseService {

    @PostConstruct
    public void initialize() {
        try {
            String key = System.getenv("ENCRYPTION_KEY");
            if (key == null) {
                throw new IllegalStateException("Encryption key is not set in environment variables.");
            }

            ProcessBuilder processBuilder = new ProcessBuilder(
                    "openssl", "enc", "-aes-256-cbc", "-d", "-in", "src/main/resources/ee85enjoyum-firebase-adminsdk-879hb-b508264fb5.json.enc",
                    "-pass", "pass:" + key
            );

            Process process = processBuilder.start();
            InputStream serviceAccount = process.getInputStream();

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);
            System.out.println("FirebaseApp has been successfully initialized.");

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to initialize FirebaseApp: " + e.getMessage());
        }
    }
}
