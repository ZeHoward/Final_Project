package com.NewTestApi.EatFun.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @Column(name = "isDel", columnDefinition = "TINYINT(1)")
    private Boolean isDel;

    public Recipes() {
    }

    public Recipes(Product product, String title, String steps, String ingredients, String notes, Integer servings, Integer cookTime, Boolean isDel) {
        this.product = product;
        this.title = title;
        this.steps = steps;
        this.ingredients = ingredients;
        this.notes = notes;
        this.servings = servings;
        this.cookTime = cookTime;
        this.isDel = isDel;
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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
