package tw.luna.FinalTest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "tw.luna.FinalTest.repository")
@EnableJpaAuditing //啟用審計功能自動建立與更新時間
public class FinalTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalTestApplication.class, args);
	}

}
