package tw.luna.FinalTest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "tw.luna.FinalTest.repository")
public class FinalTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalTestApplication.class, args);
	}

}
