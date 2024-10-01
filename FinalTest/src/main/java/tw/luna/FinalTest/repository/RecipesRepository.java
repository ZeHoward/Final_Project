package tw.luna.FinalTest.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tw.luna.FinalTest.model.Recipes;

@Repository
public interface RecipesRepository extends JpaRepository<Recipes, Integer> {
	
	List<Recipes> findByIsDelFalse();

	// 根據 productId 查找對應的 Recipe
	Optional<Recipes> findByProductProductId(int productId);
}
