-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-09-25 07:49:30
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
  `userId` bigint NOT NULL,
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
  `cartitemsId` int UNSIGNED NOT NULL,
  `cartId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `total` int NOT NULL,
  `total_quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `couponId` bigint NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
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

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `orderId` int NOT NULL,
  `userId` bigint NOT NULL,
  `cartId` int NOT NULL,
  `couponId` int UNSIGNED DEFAULT NULL,
  `orderDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `totalAmount` int NOT NULL,
  `percentageDiscount` double DEFAULT NULL,
  `amountDiscount` int DEFAULT NULL,
  `finalAmount` int NOT NULL,
  `status` enum('completed','canceled') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `cartId`, `couponId`, `orderDate`, `totalAmount`, `percentageDiscount`, `amountDiscount`, `finalAmount`, `status`) VALUES
(1, 1, 1, NULL, '2024-09-19 17:06:00', 300, 10, 30, 270, 'completed'),
(2, 2, 2, 1, '2024-09-19 17:06:00', 200, 5, 10, 190, 'completed'),
(3, 3, 3, 2, '2024-09-19 17:06:00', 150, 0, 0, 150, 'completed');

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
  `id` bigint NOT NULL,
  `productId` int NOT NULL,
  `image` longblob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `products`
--

CREATE TABLE `products` (
  `productId` int NOT NULL,
  `type` enum('mealkit','preparedFood') DEFAULT NULL,
  `sku` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` int NOT NULL,
  `categoryId` int NOT NULL,
  `stockQuantity` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDel` tinyint(1) DEFAULT '0' COMMENT '狀態：已刪除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `products`
--

INSERT INTO `products` (`productId`, `type`, `sku`, `name`, `description`, `price`, `categoryId`, `stockQuantity`, `createdAt`, `updatedAt`, `isDel`) VALUES
(4, 'preparedFood', 'SKU004', '日式豬排飯', '暖心滋味——日式豬排飯，滿足每一口！\n\n忙碌的生活中，是否想要一份既美味又方便的餐點來慰藉你的身心？\n讓我們為你帶來這款日式豬排飯調理包，讓你輕鬆享受正宗日本風味的美味餐點。\n\n金黃酥脆的豬排，外酥內嫩，搭配香甜醬汁與細滑米飯，每一口都是味覺的享受。豬肉富含蛋白質，搭配精選米飯，營養均衡，讓你吃得健康又滿足。\n\n不論何時，這款日式豬排飯都是你的理想選擇，為忙碌的日常帶來簡單卻充滿幸福感的餐桌時光。\n\n日式豬排飯，完美融合香脆豬排與醇厚醬汁，再加上柔軟的米飯，為你呈現一份暖心的料理。不論是家庭聚餐或獨自享用，都能帶來溫暖與滿足。\n\n淨重：450g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n豬肉原產地：台灣製造\n\n製造商：即食享熱股份有限公司\n\n地址：408台中市南屯區公益路二段51號18樓\n\n服務專線：04-2326-5860\n\n過敏原標示：本產品含有麩質、蛋、大豆及其製品。該產線生產含麩質之穀物、蛋、大豆、魚類及其製品。\n\n加熱方式：\n\n★本產品應先解凍再加熱\n電鍋加熱：請將豬排、米飯置入可蒸煮容器中，在外鍋加入約一杯水量，待電鍋跳起即可食用。\n直火加熱：請將豬排、米飯置入鍋中，充分加熱即可食用。\n微波爐（800W）加熱：請撕除封膜，微波約3-5分鐘即可食用。\n\n運送方式：低溫物流配送', 130, 1, 50, '2024-09-19 11:00:30', '2024-09-22 12:18:55', 0),
(5, 'preparedFood', 'SKU005', '南洋叻沙海鮮湯麵', '濃郁椰奶香——南洋叻沙海鮮湯麵，香辣美味的異國風味！\n\n這款南洋叻沙海鮮湯麵將豐富的海鮮與南洋特有的叻沙湯底完美結合，椰奶的香濃與香料的辛辣交織出迷人的層次感。\n\n新鮮的海鮮搭配彈牙的麵條，入口即化，讓你一口就愛上這道經典南洋料理。\n\n淨重：500g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 160, 1, 50, '2024-09-22 11:10:58', '2024-09-22 12:18:55', 0),
(6, 'preparedFood', 'SKU006', '奶油松露百菇燉飯', '奢華風味——奶油松露百菇燉飯，帶來無與倫比的美味享受！\n\n這款燉飯以香濃的奶油與珍貴的松露精心調製，融合多種菌菇的鮮美，讓每一口都充滿濃郁香氣。\n\n松露的高雅風味和奶油的絲滑口感交織，絕對是你不可錯過的美味選擇。\n\n淨重：400g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 180, 1, 45, '2024-09-22 11:10:58', '2024-09-22 12:18:55', 0),
(7, 'preparedFood', 'SKU007', '泰式冬蔭功酸辣海鮮湯', '正宗泰國風味——泰式冬蔭功酸辣海鮮湯，酸辣開胃的完美湯品！\n\n這款湯品以泰國經典的冬蔭功湯底為基礎，融入豐富的海鮮，酸辣的湯頭充滿香茅和檸檬草的清新氣息。\n\n每一口都能品味到濃郁的酸辣和豐富的海鮮風味，是你解饞的理想湯品選擇。\n\n淨重：450g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 135, 1, 50, '2024-09-22 11:10:58', '2024-09-22 12:18:55', 0),
(8, 'preparedFood', 'SKU008', '印度雞肉香飯', '印度香料風情——印度雞肉香飯，異國風味的香料大餐！\n\n這款印度雞肉香飯選用特製的香料，與嫩滑的雞肉搭配，米飯充分吸收香料的風味，讓人食指大動。\n\n濃郁的咖哩香與多層次的香料滋味，為你呈現道地的印度美味。\n\n淨重：500g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 170, 1, 45, '2024-09-22 11:10:58', '2024-09-22 12:18:55', 0),
(9, 'preparedFood', 'SKU009', '新加坡海南雞飯', '經典風味——新加坡海南雞飯，簡單卻令人回味無窮的經典美食！\n\n這款海南雞飯採用嫩滑的雞肉，搭配香氣四溢的雞油飯，口感豐富，風味獨特。\n\n每一口飯都蘸滿雞肉的鮮香，帶來無法抗拒的美味。\n\n淨重：450g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 160, 1, 50, '2024-09-22 11:10:58', '2024-09-22 12:18:55', 0),
(10, 'preparedFood', 'SKU010', '韓式五色石鍋拌飯', '韓式經典——五色石鍋拌飯，滿滿的韓國風味！\n\n這款石鍋拌飯選用五種蔬菜與牛肉、雞蛋拌飯，搭配香濃的韓式醬汁，鮮香濃郁。\n\n讓你在家也能輕鬆享受韓國傳統料理的美味。\n\n淨重：500g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 170, 1, 45, '2024-09-22 11:10:58', '2024-09-22 12:18:55', 0),
(11, 'preparedFood', 'SKU011', '馬來西亞椰漿飯', '南洋風味——馬來西亞椰漿飯，獨特的南洋風情！\n\n這款椰漿飯以香濃的椰奶煮成，搭配多種南洋香料，讓你感受正宗馬來風味。\n\n椰漿飯的口感香滑，搭配小魚乾、花生等配料，層次豐富，口感滿分。\n\n淨重：450g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 150, 1, 50, '2024-09-22 11:10:58', '2024-09-22 12:18:55', 0),
(12, 'preparedFood', 'SKU012', '越南牛肉河粉', '清爽鮮美——越南牛肉河粉，越南經典街頭美食！\n\n這款越南牛肉河粉以新鮮牛肉和清爽的湯底為特色，滑順的河粉吸收了湯汁的精華，讓你每一口都品味到越南的異國風情。\n\n淨重：500g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 160, 1, 45, '2024-09-22 11:10:58', '2024-09-22 12:18:55', 0),
(13, 'preparedFood', 'SKU013', '希臘酥炸櫛瓜薯泥球', '健康美味——酥炸櫛瓜薯泥球，輕食小點的最佳選擇！\n\n這款櫛瓜薯泥球外皮酥脆，內餡綿密，搭配香濃的希臘風味醬汁，讓人一口接一口。\n\n低油健康的調理方式，適合追求清淡卻不失美味的你。\n\n淨重：300g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 130, 1, 50, '2024-09-22 11:10:58', '2024-09-22 12:18:55', 0),
(14, 'preparedFood', 'SKU014', '西班牙海鮮燉飯', '地中海風味——西班牙海鮮燉飯，濃郁香氣撲鼻！\n\n這款燉飯以豐富的海鮮和番紅花調味，濃郁的湯汁浸透米飯，口感飽滿。\n\n每一口都能品嚐到來自地中海的清新風味，為你帶來異國風情的餐桌享受。\n\n淨重：500g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 190, 1, 45, '2024-09-22 11:10:58', '2024-09-22 12:18:55', 0),
(15, 'mealkit', 'SKU0041', '日式豬排飯', '暖心滋味——日式豬排飯，滿足每一口！\n\n忙碌的生活中，是否想要一份既美味又方便的餐點來慰藉你的身心？\n讓我們為你帶來這款日式豬排飯調理包，讓你輕鬆享受正宗日本風味的美味餐點。\n\n金黃酥脆的豬排，外酥內嫩，搭配香甜醬汁與細滑米飯，每一口都是味覺的享受。豬肉富含蛋白質，搭配精選米飯，營養均衡，讓你吃得健康又滿足。\n\n不論何時，這款日式豬排飯都是你的理想選擇，為忙碌的日常帶來簡單卻充滿幸福感的餐桌時光。\n\n日式豬排飯，完美融合香脆豬排與醇厚醬汁，再加上柔軟的米飯，為你呈現一份暖心的料理。不論是家庭聚餐或獨自享用，都能帶來溫暖與滿足。\n\n淨重：450g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n豬肉原產地：台灣製造\n\n製造商：即食享熱股份有限公司\n\n地址：408台中市南屯區公益路二段51號18樓\n\n服務專線：04-2326-5860\n\n過敏原標示：本產品含有麩質、蛋、大豆及其製品。該產線生產含麩質之穀物、蛋、大豆、魚類及其製品。\n\n加熱方式：\n\n★本產品應先解凍再加熱\n電鍋加熱：請將豬排、米飯置入可蒸煮容器中，在外鍋加入約一杯水量，待電鍋跳起即可食用。\n直火加熱：請將豬排、米飯置入鍋中，充分加熱即可食用。\n微波爐（800W）加熱：請撕除封膜，微波約3-5分鐘即可食用。\n\n運送方式：低溫物流配送', 130, 1, 50, '2024-09-22 11:45:06', '2024-09-22 12:18:55', 0),
(16, 'mealkit', 'SKU0051', '南洋叻沙海鮮湯麵', '濃郁椰奶香——南洋叻沙海鮮湯麵，香辣美味的異國風味！\n\n這款南洋叻沙海鮮湯麵將豐富的海鮮與南洋特有的叻沙湯底完美結合，椰奶的香濃與香料的辛辣交織出迷人的層次感。\n\n新鮮的海鮮搭配彈牙的麵條，入口即化，讓你一口就愛上這道經典南洋料理。\n\n淨重：500g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 160, 1, 50, '2024-09-22 11:48:28', '2024-09-22 12:18:55', 0),
(17, 'mealkit', 'SKU0061', '奶油松露百菇燉飯', '奢華風味——奶油松露百菇燉飯，帶來無與倫比的美味享受！\n\n這款燉飯以香濃的奶油與珍貴的松露精心調製，融合多種菌菇的鮮美，讓每一口都充滿濃郁香氣。\n\n松露的高雅風味和奶油的絲滑口感交織，絕對是你不可錯過的美味選擇。\n\n淨重：400g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 180, 1, 45, '2024-09-22 11:48:28', '2024-09-22 12:18:55', 0),
(18, 'mealkit', 'SKU0071', '泰式冬蔭功酸辣海鮮湯', '正宗泰國風味——泰式冬蔭功酸辣海鮮湯，酸辣開胃的完美湯品！\n\n這款湯品以泰國經典的冬蔭功湯底為基礎，融入豐富的海鮮，酸辣的湯頭充滿香茅和檸檬草的清新氣息。\n\n每一口都能品味到濃郁的酸辣和豐富的海鮮風味，是你解饞的理想湯品選擇。\n\n淨重：450g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 150, 1, 40, '2024-09-22 11:48:28', '2024-09-22 12:18:55', 0),
(19, 'mealkit', 'SKU0081', '印度雞肉香飯', '印度香料風情——印度雞肉香飯，異國風味的香料大餐！\n\n這款印度雞肉香飯選用特製的香料，與嫩滑的雞肉搭配，米飯充分吸收香料的風味，讓人食指大動。\n\n濃郁的咖哩香與多層次的香料滋味，為你呈現道地的印度美味。\n\n淨重：500g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 170, 1, 45, '2024-09-22 11:48:28', '2024-09-22 12:18:55', 0),
(20, 'mealkit', 'SKU0091', '新加坡海南雞飯', '經典風味——新加坡海南雞飯，簡單卻令人回味無窮的經典美食！\n\n這款海南雞飯採用嫩滑的雞肉，搭配香氣四溢的雞油飯，口感豐富，風味獨特。\n\n每一口飯都蘸滿雞肉的鮮香，帶來無法抗拒的美味。\n\n淨重：450g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 160, 1, 50, '2024-09-22 11:48:28', '2024-09-22 12:18:55', 0),
(21, 'mealkit', 'SKU0101', '韓式五色石鍋拌飯', '韓式經典——五色石鍋拌飯，滿滿的韓國風味！\n\n這款石鍋拌飯選用五種蔬菜與牛肉、雞蛋拌飯，搭配香濃的韓式醬汁，鮮香濃郁。\n\n讓你在家也能輕鬆享受韓國傳統料理的美味。\n\n淨重：500g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 170, 1, 45, '2024-09-22 11:48:28', '2024-09-22 12:18:55', 0),
(22, 'mealkit', 'SKU0111', '馬來西亞椰漿飯', '南洋風味——馬來西亞椰漿飯，獨特的南洋風情！\n\n這款椰漿飯以香濃的椰奶煮成，搭配多種南洋香料，讓你感受正宗馬來風味。\n\n椰漿飯的口感香滑，搭配小魚乾、花生等配料，層次豐富，口感滿分。\n\n淨重：450g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 150, 1, 50, '2024-09-22 11:48:28', '2024-09-22 12:18:55', 0),
(23, 'mealkit', 'SKU0121', '越南牛肉河粉', '清爽鮮美——越南牛肉河粉，越南經典街頭美食！\n\n這款越南牛肉河粉以新鮮牛肉和清爽的湯底為特色，滑順的河粉吸收了湯汁的精華，讓你每一口都品味到越南的異國風情。\n\n淨重：500g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 160, 1, 45, '2024-09-22 11:48:28', '2024-09-22 12:18:55', 0),
(24, 'mealkit', 'SKU0131', '希臘酥炸櫛瓜薯泥球', '健康美味——酥炸櫛瓜薯泥球，輕食小點的最佳選擇！\n\n這款櫛瓜薯泥球外皮酥脆，內餡綿密，搭配香濃的希臘風味醬汁，讓人一口接一口。\n\n低油健康的調理方式，適合追求清淡卻不失美味的你。\n\n淨重：300g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 130, 1, 50, '2024-09-22 11:48:28', '2024-09-22 12:18:55', 0),
(25, 'mealkit', 'SKU0141', '西班牙海鮮燉飯', '地中海風味——西班牙海鮮燉飯，濃郁香氣撲鼻！\n\n這款燉飯以豐富的海鮮和番紅花調味，濃郁的湯汁浸透米飯，口感飽滿。\n\n每一口都能品嚐到來自地中海的清新風味，為你帶來異國風情的餐桌享受。\n\n淨重：500g\n\n保存條件：冷凍-18℃以下，保存12個月\n\n原產地：台灣\n\n運送方式：低溫物流配送', 190, 1, 45, '2024-09-22 11:48:28', '2024-09-22 12:18:55', 0);

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
-- 資料表結構 `usercoupons`
--

CREATE TABLE `usercoupons` (
  `userId` bigint NOT NULL,
  `couponId` bigint NOT NULL,
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
  `userId` bigint NOT NULL,
  `productId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `userfavoritesrecipes`
--

CREATE TABLE `userfavoritesrecipes` (
  `userId` bigint DEFAULT NULL,
  `recipeId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `userinfo`
--

CREATE TABLE `userinfo` (
  `id` int UNSIGNED NOT NULL,
  `userId` bigint NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `postalCode` varchar(10) DEFAULT NULL,
  `county` varchar(1000) DEFAULT NULL,
  `district` varchar(1000) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `userinfo`
--

INSERT INTO `userinfo` (`id`, `userId`, `firstName`, `lastName`, `address`, `birthday`, `postalCode`, `county`, `district`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'John', 'Doe', '123 Main St', NULL, '12345', NULL, NULL, '2024-09-19 10:56:09', '2024-09-19 10:56:09'),
(2, 2, 'Jane', 'Smith', '456 Side St', NULL, '67890', NULL, NULL, '2024-09-19 10:56:09', '2024-09-19 10:56:09'),
(3, 3, 'Bob', 'Johnson', '789 Hill Rd', NULL, '11223', NULL, NULL, '2024-09-19 10:56:09', '2024-09-19 10:56:09');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `userId` bigint NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
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
  ADD PRIMARY KEY (`cartitemsId`),
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
-- 資料表索引 `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipeId`),
  ADD KEY `productId` (`productId`);

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
-- 使用資料表自動遞增(AUTO_INCREMENT) `cart`
--
ALTER TABLE `cart`
  MODIFY `cartId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `cartitemsId` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `coupons`
--
ALTER TABLE `coupons`
  MODIFY `couponId` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `orderDetailsID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `payment`
--
ALTER TABLE `payment`
  MODIFY `paymentId` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `productimages`
--
ALTER TABLE `productimages`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `products`
--
ALTER TABLE `products`
  MODIFY `productId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipeId` int NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`),
  ADD CONSTRAINT `fk_cartitems_productId` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);

--
-- 資料表的限制式 `productimages`
--
ALTER TABLE `productimages`
  ADD CONSTRAINT `FK4oact84qfy0smlvkq3g1gfvfs` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- 資料表的限制式 `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK7ym8el5lel525y84gcwh1uc3f` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);

--
-- 資料表的限制式 `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `fk_recipes_productId` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE;

--
-- 資料表的限制式 `usercoupons`
--
ALTER TABLE `usercoupons`
  ADD CONSTRAINT `fk_coupon_usercoupons` FOREIGN KEY (`couponId`) REFERENCES `coupons` (`couponId`),
  ADD CONSTRAINT `fk_user_usercoupons` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

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
