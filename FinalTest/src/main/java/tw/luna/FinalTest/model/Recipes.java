package tw.luna.FinalTest.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "recipes")
public class Recipes {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "recipeId")
	private Integer recipeId;

	@OneToOne
	@JoinColumn(name = "productId")
	@JsonBackReference("product_recipes")
	private Product product;

	@Column(name = "title", length = 255)
	private String title;

	@Column(name = "steps", columnDefinition = "TEXT")
	private String steps;

	@Column(name = "ingredients", columnDefinition = "TEXT")
	private String ingredients;

	@Column(name = "notes", columnDefinition = "TEXT")
	private String notes;

	@Column(name = "servings")
	private Integer servings;

	@Column(name = "cookTime")
	private Integer cookTime;

	@Column(name = "level")
	private String level;

	@Column(name = "isDel", columnDefinition = "TINYINT(1)")
	private Boolean isDel;

	public Recipes() {
	}

	public Recipes(Integer recipeId, Product product, String title, String steps, String ingredients, String notes, Integer servings, Integer cookTime, String level, Boolean isDel) {
		this.recipeId = recipeId;
		this.product = product;
		this.title = title;
		this.steps = steps;
		this.ingredients = ingredients;
		this.notes = notes;
		this.servings = servings;
		this.cookTime = cookTime;
		this.level = level;  //新增
		this.isDel = isDel;
	}

	public Recipes(String level) {
		this.level = level;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Integer getRecipeId() {
		return recipeId;
	}

	public void setRecipeId(Integer recipeId) {
		this.recipeId = recipeId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}



	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getSteps() {
		return steps;
	}

	public void setSteps(String steps) {
		this.steps = steps;
	}

	public String getIngredients() {
		return ingredients;
	}

	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Integer getServings() {
		return servings;
	}

	public void setServings(Integer servings) {
		this.servings = servings;
	}

	public Integer getCookTime() {
		return cookTime;
	}


	public void setCookTime(Integer cookTime) {
		this.cookTime = cookTime;
	}

	public Boolean getIsDel() {
		return isDel;
	}

	public void setIsDel(Boolean isDel) {
		this.isDel = isDel;
	}

}
