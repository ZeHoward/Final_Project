package tw.luna.FinalTest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.luna.FinalTest.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
