CREATE TABLE `products` (
  `productId` int PRIMARY KEY,
  `type` varchar(255) COMMENT 'mealkit, preparedFood',
  `sku` varchar(50),
  `name` varchar(255),
  `description` text,
  `price` int,
  `categoryId` int,
  `stockQuantity` int,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  `token` varchar(255)
);

CREATE TABLE `users` (
  `userId` int PRIMARY KEY,
  `username` varchar(50),
  `email` varchar(100),
  `password` varchar(255),
  `phoneNumber` varchar(15),
  `createdAt` timestamp,
  `updatedAt` timestamp,
  `token` varchar(255)
);

CREATE TABLE `orders` (
  `orderId` int PRIMARY KEY,
  `userId` int,
  `cartId` int,
  `orderDate` timestamp,
  `totalAmount` int,
  `discount` double,
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
  `paymentId` int,
  `orderId` int,
  `paymentAmount` int,
  `paymentDate` timestamp
);

CREATE TABLE `recipies` (
  `recipeId` int PRIMARY KEY,
  `title` varchar(255),
  `productId` int,
  `steps` text(2000),
  `ingredients` text(2000),
  `notes` text(2000),
  `servings` int,
  `cookTime` int COMMENT 'minutes'
);

CREATE TABLE `cart` (
  `cartId` int PRIMARY KEY,
  `userId` int,
  `status` varchar(20) COMMENT '狀態：進行中、已結帳、已取消'
);

CREATE TABLE `cartItems` (
  `cartItemId` int PRIMARY KEY,
  `cartId` int,
  `productId` int,
  `quantity` int,
  `price` int
);

CREATE TABLE `orderHistory` (
  `historyId` int PRIMARY KEY,
  `orderId` int,
  `status` varchar(50) COMMENT '狀態：已成立、已取消、已完成、出貨中、備貨中',
  `changedBy` varchar(50) COMMENT '狀態：買家、賣家',
  `changedAt` timestamp,
  `comment` text
);

CREATE TABLE `category` (
  `categoryId` int PRIMARY KEY,
  `categoryName` varchar(50)
);

CREATE UNIQUE INDEX `orderDetails_index_0` ON `orderDetails` (`orderId`, `productId`);

CREATE UNIQUE INDEX `productTag_index_1` ON `productTag` (`productId`, `tagId`);

CREATE UNIQUE INDEX `cartItems_index_2` ON `cartItems` (`cartId`, `productId`);

ALTER TABLE `products` ADD FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);

ALTER TABLE `orders` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `orders` ADD FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`);

ALTER TABLE `orderDetails` ADD FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);

ALTER TABLE `orderDetails` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

ALTER TABLE `productTag` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

ALTER TABLE `productTag` ADD FOREIGN KEY (`tagId`) REFERENCES `tag` (`tagId`);

ALTER TABLE `productImages` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

ALTER TABLE `userinfo` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `payment` ADD FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);

ALTER TABLE `recipies` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

ALTER TABLE `cart` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `cartItems` ADD FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`);

ALTER TABLE `cartItems` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

ALTER TABLE `orderHistory` ADD FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);
