package tw.luna.FinalTest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tw.luna.FinalTest.model.Recipes;

@Repository
public interface RecipesRepository extends JpaRepository<Recipes, Integer> {
	
	List<Recipes> findByIsDelFalse();
}
