-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-09-19 17:22:22
-- 伺服器版本： 8.0.39
-- PHP 版本： 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `final`
--

-- --------------------------------------------------------

--
-- 資料表結構 `cart`
--

CREATE TABLE `cart` (
  `cartId` int NOT NULL,
  `userId` int NOT NULL,
  `status` varchar(20) DEFAULT NULL COMMENT '狀態：進行中、已結帳、已取消'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `cart`
--

INSERT INTO `cart` (`cartId`, `userId`, `status`) VALUES
(1, 1, '進行中'),
(2, 2, '已結帳'),
(3, 3, '已取消');

-- --------------------------------------------------------

--
-- 資料表結構 `cartitems`
--

CREATE TABLE `cartitems` (
  `cartId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `cartitems`
--

INSERT INTO `cartitems` (`cartId`, `productId`, `quantity`, `price`) VALUES
(1, 1, 2, 200),
(2, 2, 3, 150),
(3, 3, 1, 30);

-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

CREATE TABLE `category` (
  `categoryId` int NOT NULL,
  `categoryName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
(1, '異國料理'),
(2, '多人料理'),
(3, '兒童友善'),
(4, '銀髮友善'),
(5, '家常料理');

-- --------------------------------------------------------

--
-- 資料表結構 `coupons`
--

CREATE TABLE `coupons` (
  `couponId` int NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `discountType` enum('percentage','amount') DEFAULT NULL COMMENT 'percentage: 打折, amount: 減金額',
  `discountValue` int NOT NULL,
  `expiryDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `coupons`
--

INSERT INTO `coupons` (`couponId`, `code`, `name`, `discountType`, `discountValue`, `expiryDate`) VALUES
(1, 'DISC10', '10%折扣', 'percentage', 10, '2024-12-31'),
(2, 'SAVE50', '減50元', 'amount', 50, '2024-11-30'),
(3, 'HALFPRICE', '半價優惠', 'percentage', 50, '2024-10-15');

-- --------------------------------------------------------

--
-- 資料表結構 `orderdetails`
--

CREATE TABLE `orderdetails` (
  `orderDetailsID` int UNSIGNED NOT NULL,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `Address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `orderdetails`
--

INSERT INTO `orderdetails` (`orderDetailsID`, `orderId`, `productId`, `quantity`, `price`, `Address`) VALUES
(1, 1, 1, 2, 300, '123 Main St'),
(2, 2, 2, 3, 200, '456 Side St'),
(3, 3, 3, 1, 150, '789 Hill Rd');

-- --------------------------------------------------------

--
-- 資料表結構 `orderhistory`
--

CREATE TABLE `orderhistory` (
  `historyId` int UNSIGNED NOT NULL,
  `orderId` int NOT NULL,
  `status` enum('pending','shipped','completed','canceled','preparing') DEFAULT NULL COMMENT '訂單狀態',
  `changedBy` varchar(50) DEFAULT NULL COMMENT '狀態：買家、賣家',
  `changedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `orderhistory`
--

INSERT INTO `orderhistory` (`historyId`, `orderId`, `status`, `changedBy`, `changedAt`, `comment`) VALUES
(1, 1, 'completed', 'system', '2024-09-19 17:09:05', '訂單已完成'),
(2, 2, 'pending', 'system', '2024-09-19 17:09:05', '等待處理'),
(3, 3, 'shipped', 'system', '2024-09-19 17:09:05', '訂單已發貨');

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `orderId` int NOT NULL,
  `userId` int NOT NULL,
  `cartId` int NOT NULL,
  `couponId` int DEFAULT NULL,
  `orderDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `totalAmount` int NOT NULL,
  `percentageDiscount` double DEFAULT NULL,
  `amountDiscount` int DEFAULT NULL,
  `finalAmount` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `cartId`, `couponId`, `orderDate`, `totalAmount`, `percentageDiscount`, `amountDiscount`, `finalAmount`) VALUES
(1, 1, 1, NULL, '2024-09-19 17:06:00', 300, 10, 30, 270),
(2, 2, 2, 1, '2024-09-19 17:06:00', 200, 5, 10, 190),
(3, 3, 3, 2, '2024-09-19 17:06:00', 150, 0, 0, 150);

-- --------------------------------------------------------

--
-- 資料表結構 `payment`
--

CREATE TABLE `payment` (
  `paymentId` int UNSIGNED NOT NULL,
  `orderId` int NOT NULL,
  `paymentAmount` int NOT NULL,
  `paymentDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `payment`
--

INSERT INTO `payment` (`paymentId`, `orderId`, `paymentAmount`, `paymentDate`) VALUES
(1, 1, 270, '2024-09-19 17:09:05'),
(2, 2, 190, '2024-09-19 17:09:05'),
(3, 3, 150, '2024-09-19 17:09:05');

-- --------------------------------------------------------

--
-- 資料表結構 `productimages`
--

CREATE TABLE `productimages` (
  `id` int UNSIGNED NOT NULL,
  `productId` int NOT NULL,
  `image` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `productimages`
--

INSERT INTO `productimages` (`id`, `productId`, `image`) VALUES
(1, 1, 0x696d616765315f626c6f625f64617461),
(2, 2, 0x696d616765325f626c6f625f64617461),
(3, 3, 0x696d616765335f626c6f625f64617461);

-- --------------------------------------------------------

--
-- 資料表結構 `products`
--

CREATE TABLE `products` (
  `productId` int NOT NULL,
  `type` enum('mealkit','preparedFood') DEFAULT NULL COMMENT '商品類型',
  `sku` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` int NOT NULL,
  `categoryId` int DEFAULT NULL,
  `stockQuantity` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDel` tinyint(1) DEFAULT '0' COMMENT '狀態：已刪除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `products`
--

INSERT INTO `products` (`productId`, `type`, `sku`, `name`, `description`, `price`, `categoryId`, `stockQuantity`, `createdAt`, `updatedAt`, `isDel`) VALUES
(1, 'mealkit', 'SKU001', '異國料理組合', '美味異國料理', 150, 1, 50, '2024-09-19 11:00:30', '2024-09-19 11:12:54', 0),
(2, 'preparedFood', 'SKU002', '多人料理套餐', '適合多人共享的套餐', 50, 2, 100, '2024-09-19 11:00:30', '2024-09-19 11:14:24', 0),
(3, 'preparedFood', 'SKU003', '兒童友善餐', '適合兒童的健康餐點', 30, 3, 200, '2024-09-19 11:00:30', '2024-09-19 11:15:56', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `producttag`
--

CREATE TABLE `producttag` (
  `productId` int NOT NULL,
  `tagId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `producttag`
--

INSERT INTO `producttag` (`productId`, `tagId`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- 資料表結構 `recipes`
--

CREATE TABLE `recipes` (
  `recipeId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `productId` int NOT NULL,
  `steps` text,
  `ingredients` text,
  `notes` text,
  `servings` int DEFAULT NULL,
  `cookTime` int DEFAULT NULL COMMENT 'minutes',
  `isDel` tinyint(1) DEFAULT '0' COMMENT '狀態：已刪除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `recipes`
--

INSERT INTO `recipes` (`recipeId`, `title`, `productId`, `steps`, `ingredients`, `notes`, `servings`, `cookTime`, `isDel`) VALUES
(1, '異國料理蘋果派', 1, '步驟1, 步驟2', '蘋果, 糖', '無', 4, 30, 0),
(2, '多人料理雞', 2, '步驟1, 步驟2', '雞肉, 醬汁', '無', 6, 45, 0),
(3, '兒童友善蔬菜沙拉', 3, '步驟1, 步驟2', '蔬菜, 沙拉醬', '無', 2, 15, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `tag`
--

CREATE TABLE `tag` (
  `tagId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `tag`
--

INSERT INTO `tag` (`tagId`, `name`, `description`) VALUES
(1, '全素', '全素'),
(2, '高蛋白', '高蛋白'),
(3, '奶蛋素', '奶蛋素');

-- --------------------------------------------------------

--
-- 資料表結構 `usercoupons`
--

CREATE TABLE `usercoupons` (
  `userId` int NOT NULL,
  `couponId` int NOT NULL,
  `isUsed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `usercoupons`
--

INSERT INTO `usercoupons` (`userId`, `couponId`, `isUsed`) VALUES
(1, 1, 1),
(2, 2, 0),
(3, 3, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `userfavoritesproducts`
--

CREATE TABLE `userfavoritesproducts` (
  `userId` int NOT NULL,
  `productId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `userfavoritesproducts`
--

INSERT INTO `userfavoritesproducts` (`userId`, `productId`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- 資料表結構 `userfavoritesrecipes`
--

CREATE TABLE `userfavoritesrecipes` (
  `userId` int NOT NULL,
  `recipeId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `userfavoritesrecipes`
--

INSERT INTO `userfavoritesrecipes` (`userId`, `recipeId`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- 資料表結構 `userinfo`
--

CREATE TABLE `userinfo` (
  `id` int UNSIGNED NOT NULL,
  `userId` int NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postalCode` varchar(10) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `userinfo`
--

INSERT INTO `userinfo` (`id`, `userId`, `firstName`, `lastName`, `address`, `city`, `postalCode`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'John', 'Doe', '123 Main St', NULL, '12345', '2024-09-19 10:56:09', '2024-09-19 10:56:09'),
(2, 2, 'Jane', 'Smith', '456 Side St', NULL, '67890', '2024-09-19 10:56:09', '2024-09-19 10:56:09'),
(3, 3, 'Bob', 'Johnson', '789 Hill Rd', NULL, '11223', '2024-09-19 10:56:09', '2024-09-19 10:56:09');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `userId` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `token` varchar(255) DEFAULT NULL,
  `isDel` tinyint(1) DEFAULT '0' COMMENT '狀態：已刪除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`userId`, `username`, `email`, `password`, `phoneNumber`, `createdAt`, `updatedAt`, `token`, `isDel`) VALUES
(1, 'johndoe', 'john.doe@example.com', 'password123', '123456789', '2024-09-19 08:18:16', '2024-09-19 08:18:16', NULL, 0),
(2, 'janesmith', 'jane.smith@example.com', 'password456', '987654321', '2024-09-19 08:18:16', '2024-09-19 08:18:16', NULL, 0),
(3, 'bobjohnson', 'bob.johnson@example.com', 'password789', '555666777', '2024-09-19 08:18:16', '2024-09-19 08:18:16', NULL, 0);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `userId` (`userId`);

--
-- 資料表索引 `cartitems`
--
ALTER TABLE `cartitems`
  ADD UNIQUE KEY `cartItems_index_2` (`cartId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- 資料表索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- 資料表索引 `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`couponId`);

--
-- 資料表索引 `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`orderDetailsID`),
  ADD UNIQUE KEY `orderDetails_index_0` (`orderId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- 資料表索引 `orderhistory`
--
ALTER TABLE `orderhistory`
  ADD PRIMARY KEY (`historyId`),
  ADD KEY `orderId` (`orderId`);

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `couponId` (`couponId`);

--
-- 資料表索引 `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`paymentId`),
  ADD KEY `orderId` (`orderId`);

--
-- 資料表索引 `productimages`
--
ALTER TABLE `productimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- 資料表索引 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- 資料表索引 `producttag`
--
ALTER TABLE `producttag`
  ADD UNIQUE KEY `productTag_index_1` (`productId`,`tagId`),
  ADD KEY `tagId` (`tagId`);

--
-- 資料表索引 `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipeId`),
  ADD KEY `productId` (`productId`);

--
-- 資料表索引 `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`tagId`);

--
-- 資料表索引 `usercoupons`
--
ALTER TABLE `usercoupons`
  ADD UNIQUE KEY `userCoupons_index_5` (`userId`,`couponId`),
  ADD KEY `couponId` (`couponId`);

--
-- 資料表索引 `userfavoritesproducts`
--
ALTER TABLE `userfavoritesproducts`
  ADD UNIQUE KEY `userFavoritesProducts_index_3` (`userId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- 資料表索引 `userfavoritesrecipes`
--
ALTER TABLE `userfavoritesrecipes`
  ADD UNIQUE KEY `userFavoritesRecipes_index_4` (`userId`,`recipeId`),
  ADD KEY `recipeId` (`recipeId`);

--
-- 資料表索引 `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `orderDetailsID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orderhistory`
--
ALTER TABLE `orderhistory`
  MODIFY `historyId` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `payment`
--
ALTER TABLE `payment`
  MODIFY `paymentId` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `productimages`
--
ALTER TABLE `productimages`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- 資料表的限制式 `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`),
  ADD CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `orderhistory`
--
ALTER TABLE `orderhistory`
  ADD CONSTRAINT `orderhistory_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);

--
-- 資料表的限制式 `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`couponId`) REFERENCES `coupons` (`couponId`);

--
-- 資料表的限制式 `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);

--
-- 資料表的限制式 `productimages`
--
ALTER TABLE `productimages`
  ADD CONSTRAINT `productimages_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);

--
-- 資料表的限制式 `producttag`
--
ALTER TABLE `producttag`
  ADD CONSTRAINT `producttag_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  ADD CONSTRAINT `producttag_ibfk_2` FOREIGN KEY (`tagId`) REFERENCES `tag` (`tagId`);

--
-- 資料表的限制式 `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `usercoupons`
--
ALTER TABLE `usercoupons`
  ADD CONSTRAINT `usercoupons_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `usercoupons_ibfk_2` FOREIGN KEY (`couponId`) REFERENCES `coupons` (`couponId`);

--
-- 資料表的限制式 `userfavoritesproducts`
--
ALTER TABLE `userfavoritesproducts`
  ADD CONSTRAINT `userfavoritesproducts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `userfavoritesproducts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `userfavoritesrecipes`
--
ALTER TABLE `userfavoritesrecipes`
  ADD CONSTRAINT `userfavoritesrecipes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `userfavoritesrecipes_ibfk_2` FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`recipeId`);

--
-- 資料表的限制式 `userinfo`
--
ALTER TABLE `userinfo`
  ADD CONSTRAINT `userinfo_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
