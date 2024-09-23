package tw.luna.FinalTest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.luna.FinalTest.model.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
	
}
