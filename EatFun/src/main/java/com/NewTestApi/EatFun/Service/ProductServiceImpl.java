package com.NewTestApi.EatFun.Service;

import com.NewTestApi.EatFun.Entity.Product;
import com.NewTestApi.EatFun.Repository.ProductRepository;
import com.NewTestApi.EatFun.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findProductById(Integer id) {
        return productRepository.findById(id);
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> findProductsByCategory(String categoryName) {
        return productRepository.findByCategoryCategoryName(categoryName);
    }

    @Override
    public List<Product> findProductsByPriceRange(Integer minPrice, Integer maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    @Override
    public List<Product> findProductsByName(String keyword) {
        return productRepository.findByNameContaining(keyword);
    }

    @Override
    public List<Product> saveProductsInBatch(List<Product> products) {
        return productRepository.saveAll(products);
    }
}