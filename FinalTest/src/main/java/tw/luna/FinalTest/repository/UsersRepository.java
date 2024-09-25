package tw.luna.FinalTest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.Users;


public interface UsersRepository extends JpaRepository<Users, Long>{
	public List<Users> findByEmail(String email);
	
    @Query("SELECT new tw.final_project.panjay.model.UserAllInfo(u.userId, u.username, u.email, u.password, u.phoneNumber, u.userinfo.firstName, u.userinfo.lastName, u.userinfo.address, u.userinfo.postalCode, u.userinfo.county, u.userinfo.district, u.userinfo.birthday) FROM Users u WHERE u.email = :email")
    UserAllInfo findAllByEmail(@Param("email") String email);
	
}
