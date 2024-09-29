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
