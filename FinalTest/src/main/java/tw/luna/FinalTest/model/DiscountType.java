package tw.luna.FinalTest.model;
/*
 * 如何使用 DiscountType：
 * Coupon coupon = new Coupon();
 * coupon.setDiscountType(DiscountType.PERCENTAGE);  // 設置為百分比折扣
 * 
 */


public enum DiscountType {
    PERCENTAGE("percentage"),
    AMOUNT("amount");

    private final String value;

    DiscountType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return this.value;
    }

    // 可選：根據字符串值獲取枚舉
    public static DiscountType fromString(String text) {
        for (DiscountType type : DiscountType.values()) {
            if (type.value.equalsIgnoreCase(text)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown discount type: " + text);
    }
}
