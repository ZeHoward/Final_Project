package tw.luna.FinalTest.service;

import java.util.List;
import java.util.Optional;

import tw.luna.FinalTest.model.Category;
import tw.luna.FinalTest.model.Product;

public interface CategoryService {
	List<Category> findAllCategory();
	
	Optional<Category> findCategoryById(Integer CategoryId);
	
	Category saveCategory(Category category);
	
	void deleteCategory(Integer CategoryId);

	static Optional<Product> findById(Integer categoryId) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
