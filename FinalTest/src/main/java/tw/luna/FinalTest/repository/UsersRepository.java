package tw.luna.FinalTest.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.Users;


public interface UsersRepository extends JpaRepository<Users, Long>{
	public List<Users> findByEmail(String email);
	
	
    @Query("SELECT new tw.luna.FinalTest.model.UserAllInfo(u.userId, u.username, u.email, u.password, u.phoneNumber, u.userinfo.firstName, u.userinfo.lastName, u.userinfo.address, u.userinfo.postalCode, u.userinfo.county, u.userinfo.district, u.userinfo.birthday) FROM Users u WHERE u.email = :email")
    UserAllInfo findAllByEmail(@Param("email") String email);
    
    // 查詢 isDel 等於 0 的用戶總量
    @Query(value = "SELECT COUNT(isDel) FROM users u WHERE u.isDel = 0", nativeQuery = true)
    long countActiveUsers();

//	@Query("SELECT new tw.luna.FinalTest.dto.UserAllInfo(u.userId, u.username, u.email, u.password, u.phoneNumber, " +
//	           "ui.firstName, ui.lastName, ui.address, ui.postalCode, ui.county, ui.district, ui.birthday) " +
//	           "FROM User u JOIN UserInfo ui ON u.userId = ui.userId " +
//	           "WHERE u.userId = :userId")
//	Optional<UserAllInfo> findByUserId(@Param("userId") Long userId);
//    
	
	@Query(value = "SELECT u.userId, u.username, u.email, u.password, u.phoneNumber, " +
            "ui.firstName, ui.lastName, ui.address, ui.postalCode, ui.county, ui.district, ui.birthday " +
            "FROM users u " +
            "JOIN userinfo ui ON u.userId = ui.userId " +
            "WHERE u.userId = :userId", nativeQuery = true)
	List<Object[]> findByUserId(@Param("userId") Long userId);
}
