CREATE TABLE `products` (
  `productId` int PRIMARY KEY,
  `type` enum(mealkit,preparedFood) COMMENT '商品類型',
  `sku` varchar(50),
  `name` varchar(255),
  `description` text,
  `price` int,
  `categoryId` int,
  `stockQuantity` int,
  `createdAt` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `updatedAt` timestamp,
  `isDel` boolean DEFAULT false COMMENT '狀態：已刪除'
);

CREATE TABLE `users` (
  `userId` int PRIMARY KEY,
  `username` varchar(50),
  `email` varchar(100),
  `password` varchar(255),
  `phoneNumber` varchar(15),
  `createdAt` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `updatedAt` timestamp,
  `token` varchar(255),
  `isDel` boolean COMMENT '狀態：已刪除'
);

CREATE TABLE `orders` (
  `orderId` int PRIMARY KEY,
  `userId` int,
  `cartId` int,
  `couponId` int,
  `orderDate` timestamp,
  `totalAmount` int,
  `percentageDiscount` double,
  `amountDiscount` int,
  `finalAmount` int
);

CREATE TABLE `orderDetails` (
  `orderDetailsID` int,
  `orderId` int,
  `productId` int,
  `quantity` int,
  `price` int,
  `Address` varchar(255)
);

CREATE TABLE `tag` (
  `tagId` int PRIMARY KEY,
  `name` varchar(100),
  `description` text
);

CREATE TABLE `productTag` (
  `productId` int,
  `tagId` int
);

CREATE TABLE `productImages` (
  `id` int PRIMARY KEY,
  `productId` int,
  `image` blob
);

CREATE TABLE `userinfo` (
  `id` int PRIMARY KEY,
  `userId` int,
  `firstName` varchar(50),
  `lastName` varchar(50),
  `address` varchar(255),
  `city` varchar(100),
  `postalCode` varchar(10),
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `payment` (
  `paymentId` int PRIMARY KEY,
  `orderId` int,
  `paymentAmount` int,
  `paymentDate` timestamp
);

CREATE TABLE `recipes` (
  `recipeId` int PRIMARY KEY,
  `title` varchar(255),
  `productId` int,
  `steps` text(2000),
  `ingredients` text(2000),
  `notes` text(2000),
  `servings` int,
  `cookTime` int COMMENT 'minutes',
  `isDel` boolean DEFAULT false COMMENT '狀態：已刪除'
);

CREATE TABLE `cart` (
  `cartId` int PRIMARY KEY,
  `userId` int,
  `status` varchar(20) COMMENT '狀態：進行中、已結帳、已取消'
);

CREATE TABLE `cartItems` (
  `cartId` int,
  `productId` int,
  `quantity` int,
  `price` int
);

CREATE TABLE `orderHistory` (
  `historyId` int PRIMARY KEY,
  `orderId` int,
  `status` enum(pending,shipped,completed,canceled,preparing) COMMENT '訂單狀態',
  `changedBy` varchar(50) COMMENT '狀態：買家、賣家',
  `changedAt` timestamp,
  `comment` text
);

CREATE TABLE `category` (
  `categoryId` int PRIMARY KEY,
  `categoryName` varchar(50)
);

CREATE TABLE `userFavoritesProducts` (
  `userId` int,
  `productId` int
);

CREATE TABLE `userFavoritesRecipes` (
  `userId` int,
  `recipeId` int
);

CREATE TABLE `coupons` (
  `couponId` int PRIMARY KEY,
  `code` varchar(50),
  `name` varchar(50),
  `discountType` enum(percentage,amount) COMMENT 'percentage: 打折, amount: 減金額',
  `discountValue` int,
  `expiryDate` date
);

CREATE TABLE `userCoupons` (
  `userId` int,
  `couponId` int,
  `isUsed` boolean DEFAULT false
);

CREATE UNIQUE INDEX `orderDetails_index_0` ON `orderDetails` (`orderId`, `productId`);

CREATE UNIQUE INDEX `productTag_index_1` ON `productTag` (`productId`, `tagId`);

CREATE UNIQUE INDEX `cartItems_index_2` ON `cartItems` (`cartId`, `productId`);

CREATE UNIQUE INDEX `userFavoritesProducts_index_3` ON `userFavoritesProducts` (`userId`, `productId`);

CREATE UNIQUE INDEX `userFavoritesRecipes_index_4` ON `userFavoritesRecipes` (`userId`, `recipeId`);

CREATE UNIQUE INDEX `userCoupons_index_5` ON `userCoupons` (`userId`, `couponId`);

ALTER TABLE `products` ADD FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);

ALTER TABLE `orders` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `orders` ADD FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`);

ALTER TABLE `orders` ADD FOREIGN KEY (`couponId`) REFERENCES `coupons` (`couponId`);

ALTER TABLE `orderDetails` ADD FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);

ALTER TABLE `orderDetails` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

ALTER TABLE `productTag` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

ALTER TABLE `productTag` ADD FOREIGN KEY (`tagId`) REFERENCES `tag` (`tagId`);

ALTER TABLE `productImages` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

ALTER TABLE `userinfo` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `payment` ADD FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);

ALTER TABLE `recipes` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

ALTER TABLE `cart` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `cartItems` ADD FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`);

ALTER TABLE `cartItems` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

ALTER TABLE `orderHistory` ADD FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);

ALTER TABLE `userFavoritesProducts` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `userFavoritesProducts` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

ALTER TABLE `userFavoritesRecipes` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `userFavoritesRecipes` ADD FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`recipeId`);

ALTER TABLE `userCoupons` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `userCoupons` ADD FOREIGN KEY (`couponId`) REFERENCES `coupons` (`couponId`);
