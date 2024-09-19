-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:8889
-- 產生時間： 2024 年 09 月 19 日 06:29
-- 伺服器版本： 8.0.35
-- PHP 版本： 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `final`
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

-- --------------------------------------------------------

--
-- 資料表結構 `cartItems`
--

CREATE TABLE `cartItems` (
  `cartId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

CREATE TABLE `category` (
  `categoryId` int NOT NULL,
  `categoryName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- --------------------------------------------------------

--
-- 資料表結構 `orderDetails`
--

CREATE TABLE `orderDetails` (
  `orderDetailsID` int NOT NULL,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `Address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `orderHistory`
--

CREATE TABLE `orderHistory` (
  `historyId` int NOT NULL,
  `orderId` int NOT NULL,
  `status` enum('pending','shipped','completed','canceled','preparing') DEFAULT NULL COMMENT '訂單狀態',
  `changedBy` varchar(50) DEFAULT NULL COMMENT '狀態：買家、賣家',
  `changedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- --------------------------------------------------------

--
-- 資料表結構 `payment`
--

CREATE TABLE `payment` (
  `paymentId` int NOT NULL,
  `orderId` int NOT NULL,
  `paymentAmount` int NOT NULL,
  `paymentDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `productImages`
--

CREATE TABLE `productImages` (
  `id` int NOT NULL,
  `productId` int NOT NULL,
  `image` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- --------------------------------------------------------

--
-- 資料表結構 `productTag`
--

CREATE TABLE `productTag` (
  `productId` int NOT NULL,
  `tagId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- --------------------------------------------------------

--
-- 資料表結構 `tag`
--

CREATE TABLE `tag` (
  `tagId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `userCoupons`
--

CREATE TABLE `userCoupons` (
  `userId` int NOT NULL,
  `couponId` int NOT NULL,
  `isUsed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `userFavoritesProducts`
--

CREATE TABLE `userFavoritesProducts` (
  `userId` int NOT NULL,
  `productId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `userFavoritesRecipes`
--

CREATE TABLE `userFavoritesRecipes` (
  `userId` int NOT NULL,
  `recipeId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `userinfo`
--

CREATE TABLE `userinfo` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postalCode` varchar(10) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
-- 已傾印資料表的索引
--

--
-- 資料表索引 `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `userId` (`userId`);

--
-- 資料表索引 `cartItems`
--
ALTER TABLE `cartItems`
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
-- 資料表索引 `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD PRIMARY KEY (`orderDetailsID`),
  ADD UNIQUE KEY `orderDetails_index_0` (`orderId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- 資料表索引 `orderHistory`
--
ALTER TABLE `orderHistory`
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
-- 資料表索引 `productImages`
--
ALTER TABLE `productImages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- 資料表索引 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- 資料表索引 `productTag`
--
ALTER TABLE `productTag`
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
-- 資料表索引 `userCoupons`
--
ALTER TABLE `userCoupons`
  ADD UNIQUE KEY `userCoupons_index_5` (`userId`,`couponId`),
  ADD KEY `couponId` (`couponId`);

--
-- 資料表索引 `userFavoritesProducts`
--
ALTER TABLE `userFavoritesProducts`
  ADD UNIQUE KEY `userFavoritesProducts_index_3` (`userId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- 資料表索引 `userFavoritesRecipes`
--
ALTER TABLE `userFavoritesRecipes`
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
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- 資料表的限制式 `cartItems`
--
ALTER TABLE `cartItems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`),
  ADD CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `orderHistory`
--
ALTER TABLE `orderHistory`
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
-- 資料表的限制式 `productImages`
--
ALTER TABLE `productImages`
  ADD CONSTRAINT `productimages_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);

--
-- 資料表的限制式 `productTag`
--
ALTER TABLE `productTag`
  ADD CONSTRAINT `producttag_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  ADD CONSTRAINT `producttag_ibfk_2` FOREIGN KEY (`tagId`) REFERENCES `tag` (`tagId`);

--
-- 資料表的限制式 `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `userCoupons`
--
ALTER TABLE `userCoupons`
  ADD CONSTRAINT `usercoupons_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `usercoupons_ibfk_2` FOREIGN KEY (`couponId`) REFERENCES `coupons` (`couponId`);

--
-- 資料表的限制式 `userFavoritesProducts`
--
ALTER TABLE `userFavoritesProducts`
  ADD CONSTRAINT `userfavoritesproducts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `userfavoritesproducts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `userFavoritesRecipes`
--
ALTER TABLE `userFavoritesRecipes`
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
