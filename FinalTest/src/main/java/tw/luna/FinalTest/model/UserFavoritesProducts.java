package tw.luna.FinalTest.model;
//import com.fasterxml.jackson.annotation.JsonBackReference;
//
//import jakarta.persistence.EmbeddedId;
//import jakarta.persistence.Entity;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.MapsId;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name = "userfavoritesproducts")
//public class UserFavoritesProducts {
//	
//	@EmbeddedId
//	private UserFavoritesProductsKeys id;
//	
//	@JsonBackReference
//	@ManyToOne
//	@JoinColumn(name = "userId")
//	@MapsId("userId")
//	private Users users;



import jakarta.persistence.*;

@Entity
@Table(name = "userfavoritesproducts")
public class UserFavoritesProducts {

    @EmbeddedId
    private UserFavoritesProductsId id;


    // Constructors
    public UserFavoritesProducts() {}

    public UserFavoritesProducts(UserFavoritesProductsId id) {
        this.id = id;
    }

    public UserFavoritesProducts(Long userId, int productId) {
        this.id = new UserFavoritesProductsId(userId, productId);
    }

    // Getters and Setters
    public UserFavoritesProductsId getId() {
        return id;
    }

    public void setId(UserFavoritesProductsId id) {
        this.id = id;
    }


    public int getProductId() {
        return id.getProductId();
    }
}
	
	
//}
