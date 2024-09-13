CREATE TABLE `products` (
  `productId` int(255) PRIMARY KEY,
  `sku` varchar(50),
  `name` varchar(255),
  `description` text,
  `price` int,
  `catagoryId` int,
  `stockQuantity` int,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `users` (
  `userId` int(255) PRIMARY KEY,
  `username` varchar(50),
  `email` varchar(100),
  `password` varchar(255),
  `phoneNumber` varchar(15),
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `orders` (
  `orderId` int(255) PRIMARY KEY,
  `userId` int(255),
  `cartId` int(255),
  `orderDate` timestamp,
  `totalAmount` int,
  `discount` double,
  `finalAmount` int
);

CREATE TABLE `orderDetails` (
  `orderDetailsID` int(255),
  `orderId` int(255),
  `productId` int(255),
  `quantity` int,
  `price` int,
  `Address` varchar(255)
);

CREATE TABLE `tag` (
  `tagId` int(255) PRIMARY KEY,
  `name` varchar(100),
  `description` text
);

CREATE TABLE `productTag` (
  `productId` int(255),
  `tagId` int(255)
);

CREATE TABLE `productImages` (
  `id` int(255) PRIMARY KEY,
  `productId` int(255),
  `image` blob
);

CREATE TABLE `userinfo` (
  `id` int(255) PRIMARY KEY,
  `userId` int(255),
  `firstName` varchar(50),
  `lastName` varchar(50),
  `address` varchar(255),
  `city` varchar(100),
  `postalCode` varchar(10),
  `createdAt` timestamp,
  `updateAt` timestamp
);

CREATE TABLE `payment` (
  `paymentId` int(255),
  `orderId` int(255),
  `paymentAmount` int,
  `paymentDate` timestamp
);

CREATE TABLE `recipies` (
  `recipeId` int(255) PRIMARY KEY,
  `title` varchar(255),
  `productId` int(255),
  `steps` text(2000),
  `ingredients` text(2000),
  `notes` text(2000),
  `servings` int,
  `cookTime` int COMMENT 'minutes'
);

CREATE TABLE `cart` (
  `cartId` int(255) PRIMARY KEY,
  `userId` int(255),
  `status` varchar(20) COMMENT '狀態：進行中、已結帳、已取消'
);

CREATE TABLE `cartItems` (
  `cartItemId` int(255) PRIMARY KEY,
  `cartId` int(255),
  `productId` int(255),
  `quantity` int,
  `price` int
);

CREATE TABLE `orderHistory` (
  `historyId` int(255) PRIMARY KEY,
  `orderId` int(255),
  `status` varchar(50) COMMENT '狀態：已成立、已取消、已完成、出貨中、備貨中',
  `changedBy` varchar(50) COMMENT '狀態：買家、賣家',
  `changedAt` timestamp,
  `comment` text
);

CREATE TABLE `catagory` (
  `catagoryId` int(255) PRIMARY KEY,
  `catagoryName` varchar(50)
);

CREATE UNIQUE INDEX `orderDetails_index_0` ON `orderDetails` (`orderId`, `productId`);

CREATE UNIQUE INDEX `productTag_index_1` ON `productTag` (`productId`, `tagId`);

CREATE UNIQUE INDEX `cartItems_index_2` ON `cartItems` (`cartId`, `productId`);

ALTER TABLE `products` ADD FOREIGN KEY (`catagoryId`) REFERENCES `catagory` (`catagoryId`);

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
