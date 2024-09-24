package tw.luna.FinalTest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<<<<<<< HEAD
=======
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
>>>>>>> fe40ffe3b381a21f62e7610326a6d87ca9d3e894
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "tw.luna.FinalTest.repository")
<<<<<<< HEAD
=======
@EnableJpaAuditing //啟用審計功能自動建立與更新時間
>>>>>>> fe40ffe3b381a21f62e7610326a6d87ca9d3e894
public class FinalTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalTestApplication.class, args);
	}

}
