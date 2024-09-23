package tw.luna.FinalTest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tw.luna.FinalTest.model.Category;
import tw.luna.FinalTest.repository.CategoryRepository;
@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public List<Category> findAllCategory() {
		return categoryRepository.findAll();
	}

	@Override
	public Optional<Category> findCategoryById(Integer CategoryId) {
		return categoryRepository.findById(CategoryId);
	}

	@Override
	public Category saveCategory(Category category) {
		return categoryRepository.save(category);
	}

	@Override
	public void deleteCategory(Integer CategoryId) {
		categoryRepository.deleteById(CategoryId);
	}

}
