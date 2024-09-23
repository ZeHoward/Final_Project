package tw.luna.FinalTest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tw.luna.FinalTest.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 自定義查詢方法
    User findByUsername(String username);
    User findByEmail(String email);
}
