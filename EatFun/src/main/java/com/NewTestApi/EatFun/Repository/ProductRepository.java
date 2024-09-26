package com.NewTestApi.EatFun.Repository;

import java.util.List;

import com.NewTestApi.EatFun.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;



public interface ProductRepository extends JpaRepository<Product, Integer> {

//    List<Product> findByCategoryCategoryName(String categoryName);
//
//
//    List<Product> findByPriceBetween(Integer minPrice, Integer maxPrice);
//
//    //模糊查詢
//    List<Product> findByNameContaining(String keyword);

}