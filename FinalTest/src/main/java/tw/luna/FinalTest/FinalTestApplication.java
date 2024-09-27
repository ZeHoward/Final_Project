package tw.luna.FinalTest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "tw.luna.FinalTest.repository")
@EnableTransactionManagement
@EnableSpringDataWebSupport // 支持切換分頁功能
//@EnableJpaAuditing //啟用審計功能自動建立與更新時間

public class FinalTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalTestApplication.class, args);
	}

}
