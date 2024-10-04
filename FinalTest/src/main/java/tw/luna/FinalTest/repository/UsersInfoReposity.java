package tw.luna.FinalTest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.luna.FinalTest.model.Userinfo;
import tw.luna.FinalTest.model.Users;


public interface UsersInfoReposity extends JpaRepository<Userinfo, Long>{
	
	Optional<Userinfo> findByUsers(Users users);

}
