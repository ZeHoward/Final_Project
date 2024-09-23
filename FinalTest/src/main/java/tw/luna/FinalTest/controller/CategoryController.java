package tw.luna.FinalTest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tw.luna.FinalTest.model.Category;
import tw.luna.FinalTest.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	//查詢所有類別
	@GetMapping
	public List<Category> getAllCategories(){
		return categoryService.findAllCategory();
	}
	
	//根據id查詢類別
	@GetMapping("/{id}")
	public Category getCategoryById(@PathVariable Integer id) {
		return categoryService.findCategoryById(id).orElse(null);
	}
	
	//新增或更新類別
	@PostMapping
	public Category createOrUpdateCategory(@RequestBody Category category) {
		return categoryService.saveCategory(category);
	}
	
	@DeleteMapping("/{id}")
	public void deleteCategory(@PathVariable Integer id) {
		categoryService.deleteCategory(id);
	}
	
}
