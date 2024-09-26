//package tw.luna.FinalTest.model;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name = "cart")
//public class Cart {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "cartId")
//	private Long cardId;
//	
//    
//	
//	@Column(name = "status")
//	private String status;
//	
//	
////	@ManyToOne()
////	@JoinColumn(name = "userId")
////	private Users users;
//
//	public Long getCardId() {
//		return cardId;
//	}
//
//	public void setCardId(Long cardId) {
//		this.cardId = cardId;
//	}
//
//	
//
//	public String getStatus() {
//		return status;
//	}
//
//	public void setStatus(String status) {
//		this.status = status;
//	}
//
////	public Users getUsers() {
////		return users;
////	}
////
////	public void setUsers(Users users) {
////		this.users = users;
////	}
////	
//	
//}
