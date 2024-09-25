package tw.luna.FinalTest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.luna.FinalTest.model.Userinfo;


public interface UsersInfoReposity extends JpaRepository<Userinfo, Long>{

}
