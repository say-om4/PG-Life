-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2026 at 05:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pglife`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pg_id` int(11) NOT NULL,
  `booking_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Pending','Confirmed','Cancelled') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `pg_id`, `booking_date`, `status`) VALUES
(1, 1, 3, '2026-07-11 14:58:42', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `pgs`
--

CREATE TABLE `pgs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `room_type` varchar(50) DEFAULT NULL,
  `gender` enum('Boys','Girls','Unisex') DEFAULT NULL,
  `food` tinyint(1) DEFAULT 1,
  `wifi` tinyint(1) DEFAULT 1,
  `bathroom` varchar(50) DEFAULT NULL,
  `parking` tinyint(1) DEFAULT 0,
  `power_backup` tinyint(1) DEFAULT 1,
  `independent` tinyint(1) DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Vacant','Full') NOT NULL DEFAULT 'Vacant',
  `property_type` enum('PG','Room','Apartment','Hostel') NOT NULL DEFAULT 'PG',
  `rating_setting` enum('reviews','admin') NOT NULL DEFAULT 'reviews',
  `contact_display` enum('both','email','phone') NOT NULL DEFAULT 'both',
  `phone2` varchar(15) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pgs`
--

INSERT INTO `pgs` (`id`, `user_id`, `name`, `city`, `address`, `price`, `rating`, `room_type`, `gender`, `food`, `wifi`, `bathroom`, `parking`, `power_backup`, `image`, `description`, `status`, `property_type`, `created_at`) VALUES
(1, NULL, 'Sunrise PG', 'Delhi', 'Laxmi Nagar, Delhi', 7500.00, 4.8, 'Single Sharing', 'Boys', 1, 1, 'Attached', 1, 1, 'pg1.jpg', 'A premium boys PG with modern rooms, healthy food, high-speed WiFi and excellent security.', 'Vacant', 'PG', '2026-07-11 13:25:36'),
(2, NULL, 'Royal Stay PG', 'Bangalore', 'BTM Layout, Bangalore', 6000.00, 4.7, 'Double Sharing', 'Girls', 1, 0, 'Attached', 0, 1, 'pg2.jpg', 'Comfortable girls PG with spacious rooms, daily housekeeping and delicious meals.', 'Vacant', 'PG', '2026-07-11 13:25:36'),
(3, NULL, 'Green Nest PG', 'Pune', 'Hinjewadi, Pune', 7200.00, 4.7, 'Triple Sharing', 'Unisex', 1, 1, 'Common', 1, 1, 'pg3.jpg', 'Affordable unisex PG near IT park with modern facilities and a friendly environment.', 'Vacant', 'PG', '2026-07-11 13:25:36'),
(5, NULL, 'Apna pg', 'Dehradun', 'premnagar kehrigaon', 7000.00, 4.9, 'Double Sharing', 'Boys', 1, 1, 'Attached', 1, 1, '1783869451_pg4.jpg.jpg', 'free wifi electricity include parking ', 'Vacant', 'PG', '2026-07-12 15:17:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `phone`, `password`, `created_at`, `role`) VALUES
(1, 'akshay', 'gamerakki559811@gmail.com', '7865890432', '$2y$10$xcRT1U64suwxCxyt6Mlz6uPA2EX1LlnDdYEBGDN/sD4X.59khZity', '2026-07-11 13:50:46', 'user'),
(2, 'Om', 'omjeexig@gmail.com', '8679389489', '$2y$10$x9RZkbZFWcHAlB6xkEbOfOU6R.T2j8unkZhLIbCTeWhzrWYYqXfUC', '2026-07-11 20:27:29', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pg_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pg_id` (`pg_id`);

--
-- Indexes for table `pgs`
--
ALTER TABLE `pgs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pg_id` (`pg_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pgs`
--
ALTER TABLE `pgs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`pg_id`) REFERENCES `pgs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`pg_id`) REFERENCES `pgs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pgs`
--
ALTER TABLE `pgs`
  ADD CONSTRAINT `pgs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Table structure for table `reviews`
--
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `pg_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(1) NOT NULL,
  `review_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_pg_review` (`user_id`,`pg_id`),
  ADD KEY `pg_id` (`pg_id`);

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`pg_id`) REFERENCES `pgs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
