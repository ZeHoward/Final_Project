package tw.luna.FinalTest.model;


import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Column;
@Embeddable
public class UserFavoritesProductsId implements Serializable {


    private Long userId;

    private int productId;

    public UserFavoritesProductsId() {}

    public UserFavoritesProductsId(Long userId, int productId) {
        this.userId = userId;
        this.productId = productId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserFavoritesProductsId that = (UserFavoritesProductsId) o;
        return productId == that.productId && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, productId);
    }
}
