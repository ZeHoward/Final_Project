package tw.luna.FinalTest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.luna.FinalTest.model.Category;
import tw.luna.FinalTest.model.Product;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
}
