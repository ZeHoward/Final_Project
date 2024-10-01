package tw.luna.FinalTest.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.Users;


public interface UsersRepository extends JpaRepository<Users, Long>{
	public List<Users> findByEmail(String email);
	

    // 查詢 isDel 等於 0 的用戶總量
    @Query(value = "SELECT COUNT(isDel) FROM users u WHERE u.isDel = 0", nativeQuery = true)
    long countActiveUsers();  
	
	@Query(value = "SELECT u.userId, u.username, u.email, u.password, u.phoneNumber, " +
            "ui.firstName, ui.lastName, ui.address, ui.postalCode, ui.county, ui.district, ui.birthday, u.isDel, u.isVerified " +
            "FROM users u " +
            "JOIN userinfo ui ON u.userId = ui.userId " +
            "WHERE u.userId = :userId", nativeQuery = true)
	List<Object[]> findByUserId(@Param("userId") Long userId);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE users SET isDel = true WHERE userId = :userId", nativeQuery = true)
	int updateUserByUserId(@Param("userId") Long userId);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE users SET password = :newPassword WHERE userId = :userId", nativeQuery = true)
	int updatePasswordByUserId(@Param("newPassword") String newPassword, @Param("userId") Long userId);
	
	
	@Query(value = "SELECT userId, username, email, password, phoneNumber, token, isDel, isVerified FROM users WHERE token = :token", nativeQuery = true)
	List<Object[]> findByToken(@Param("token") String token);
	
}
