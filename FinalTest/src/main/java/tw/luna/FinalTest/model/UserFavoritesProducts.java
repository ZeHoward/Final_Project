//package tw.luna.FinalTest.model;
//
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
//	
//	
//}
