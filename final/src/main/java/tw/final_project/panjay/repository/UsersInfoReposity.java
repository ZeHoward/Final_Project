package tw.final_project.panjay.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.final_project.panjay.model.Userinfo;

public interface UsersInfoReposity extends JpaRepository<Userinfo, Long>{

}
