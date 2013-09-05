-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2013 at 09:42 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mealo`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE IF NOT EXISTS `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `city` int(11) NOT NULL,
  `area` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_city_uid` (`city`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE IF NOT EXISTS `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `city`) VALUES
(1, 'mumbai');

-- --------------------------------------------------------

--
-- Table structure for table `geolocation`
--

CREATE TABLE IF NOT EXISTS `geolocation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `geolocation`
--

INSERT INTO `geolocation` (`id`, `latitude`, `longitude`) VALUES
(1, 19.055229, 72.830829),
(2, 19.0673821, 72.82274380000001),
(3, 18.9203886, 72.83013059999996);

-- --------------------------------------------------------

--
-- Table structure for table `mealo`
--

CREATE TABLE IF NOT EXISTS `mealo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuId` int(11) NOT NULL,
  `tablesize` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `uid` int(11) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `mealo`
--

INSERT INTO `mealo` (`id`, `menuId`, `tablesize`, `time`, `created`, `uid`, `description`) VALUES
(1, 1, 5, '2013-09-18 13:16:20', '2013-09-04 21:49:15', 1, 'This is the description of description on description'),
(2, 6, 7, '2013-09-19 07:20:19', '2013-09-04 21:49:15', 1, 'This is the description of description on description'),
(3, 3, 5, '2013-09-20 13:16:20', '2013-09-04 21:51:57', 2, 'This is the description of description on description'),
(4, 5, 7, '2013-09-25 07:20:19', '2013-09-04 21:51:54', 2, 'This is the description of description on description');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `restId` int(11) NOT NULL,
  `menu` varchar(255) NOT NULL,
  `type` enum('Breakfast','Brunch','Lunch','Dinner') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `restId`, `menu`, `type`) VALUES
(1, 1, '', 'Breakfast'),
(2, 1, '', 'Brunch'),
(3, 2, '', 'Brunch'),
(4, 2, '', 'Dinner'),
(5, 1, '', 'Dinner'),
(6, 2, '', 'Lunch'),
(7, 2, '', 'Breakfast');

-- --------------------------------------------------------

--
-- Table structure for table `participant`
--

CREATE TABLE IF NOT EXISTS `participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mealoId` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE IF NOT EXISTS `restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `locationId` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone1` varchar(15) NOT NULL,
  `phone2` varchar(15) NOT NULL,
  `phone3` varchar(15) NOT NULL,
  `cityId` int(11) NOT NULL,
  `maxTableSize` int(11) NOT NULL,
  `cuisine` varchar(80) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `note` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`id`, `name`, `locationId`, `email`, `phone1`, `phone2`, `phone3`, `cityId`, `maxTableSize`, `cuisine`, `picture`, `note`) VALUES
(1, 'Spice Tree', 1, 'sobingt@gmail.com', '02226405161', '02226405161', '', 1, 20, 'Chinese ', '', NULL),
(2, 'Out Of The Blue Rest', 2, 'bluerest@rest.com', '12345676', '', '', 1, 20, 'American', '', NULL),
(3, 'Leopold Cafe & Bar', 3, 'leapoldcafe@gmail.com', '423423542', '', '', 1, 20, 'Mexican', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE IF NOT EXISTS `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `refId` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `feedback` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `role` varchar(15) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `fname`, `lname`, `email`, `username`, `password`, `phone`, `role`) VALUES
(1, 'Sobin', 'Thomas', 'sobingt@gmail.com', 'sobingt', 'hj34ktb32dsfsad423j763', '12345678', 'admin'),
(2, 'Akshat', 'Verma', 'akshat@bitbrothers.in', 'akshat', 'cxvmzxkcjvhjdf7hjfkbdah', '3423524543', 'user');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_city_uid` FOREIGN KEY (`city`) REFERENCES `city` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
