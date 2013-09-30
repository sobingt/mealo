-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2013 at 07:57 AM
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
-- Stand-in structure for view `attendance`
--
CREATE TABLE IF NOT EXISTS `attendance` (
`mealid` int(11)
,`attend` bigint(21)
);
-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE IF NOT EXISTS `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `city`) VALUES
(1, 'mumbai'),
(2, 'navi mumbai');

-- --------------------------------------------------------

--
-- Table structure for table `facebook`
--

CREATE TABLE IF NOT EXISTS `facebook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `access_token` varchar(256) NOT NULL,
  `uid` int(11) NOT NULL,
  `time` datetime NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `facebook`
--

INSERT INTO `facebook` (`id`, `access_token`, `uid`, `time`) VALUES
(1, 'CAACSFpB47i8BAHLD3eo3uYDKO6lKIcpj3b2tMc3qehWqqtKaYisNPZBKhhSP4l0WbBRcdVdrBxGEn0YZBlCGZBh02vJ84b6ondJtrW32ShLKKC9hm8CVMkrCZCjBi0iymDawJOqfLZBwlKIMBOzL3dpw5oY9QP01I7PuFzZB6M7Gzm76UZBarmw', 121, '2013-11-28 23:13:22');

-- --------------------------------------------------------

--
-- Table structure for table `geolocation`
--

CREATE TABLE IF NOT EXISTS `geolocation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `geolocation`
--

INSERT INTO `geolocation` (`id`, `latitude`, `longitude`) VALUES
(1, 19.055229, 72.830829),
(2, 19.0673821, 72.82274380000001),
(3, 18.9203886, 72.83013059999996),
(4, 19.0673821, 72.7227438),
(5, 19.0673821, 72.7227438),
(6, 19.0673821, 72.7227438),
(7, 19.0673821, 72.7227438),
(8, 19.0673821, 72.7227438),
(9, 19.0673821, 72.7227438),
(10, 19.0673821, 72.7227438),
(11, 19.0673821, 72.7227438),
(12, 19.0673821, 72.7227438),
(13, 19.0673821, 72.7227438),
(14, 19.0673821, 72.7227438),
(15, 19.0673821, 72.7227438),
(16, 19.0673821, 72.7227438),
(17, 19.0673821, 72.7227438),
(18, 19.0673821, 72.7227438),
(19, 19.0673821, 72.7227438),
(20, 19.0673821, 72.7227438),
(21, 19.0673821, 72.7227438),
(22, 19.0673821, 72.7227438),
(23, 19.0673821, 72.7227438),
(24, 19.0673821, 72.7227438),
(25, 19.0673821, 72.7227438),
(26, 19.0673821, 72.7227438);

-- --------------------------------------------------------

--
-- Table structure for table `mealo`
--

CREATE TABLE IF NOT EXISTS `mealo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(35) NOT NULL,
  `menuId` int(11) NOT NULL,
  `tablesize` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `uid` int(11) NOT NULL,
  `description` text NOT NULL,
  `images` varchar(256) NOT NULL,
  `status` enum('incomplete','complete','past') NOT NULL DEFAULT 'incomplete',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Dumping data for table `mealo`
--

INSERT INTO `mealo` (`id`, `name`, `menuId`, `tablesize`, `time`, `created`, `uid`, `description`, `images`, `status`) VALUES
(1, 'mealo for me', 1, 5, '2013-09-18 13:16:20', '2013-09-29 20:13:43', 1, 'This is the description of description on description', './public/images/cup-cakes-gurgaon.jpg', 'complete'),
(2, 'mealo 2', 6, 7, '2013-09-19 07:20:19', '2013-09-29 20:13:41', 1, 'This is the description of description on description', './public/images/cup-cakes-gurgaon.jpg', 'complete'),
(3, 'mealo 3', 3, 5, '2013-09-20 13:16:20', '2013-09-29 20:13:39', 2, 'This is the description of description on description', './public/images/cup-cakes-gurgaon.jpg', 'complete'),
(4, 'mealo 4', 5, 7, '2013-09-25 07:20:19', '2013-09-29 23:30:06', 2, 'This is the description of description on description', './public/images/cup-cakes-gurgaon.jpg', 'past'),
(24, 'dfgdfgdfg', 4, 6, '2012-12-02 23:15:00', '2013-09-29 22:53:42', 121, 'dfgdfgdfg', './public/images/1.-New-Screen.png', 'incomplete'),
(25, 'hfghfgh', 5, 8, '2012-12-02 22:30:00', '2013-09-29 23:08:47', 121, 'gfhfghfg', './public/images/1.png', 'incomplete'),
(26, 'fdgdfgdf', 2, 5, '2012-12-02 21:30:00', '2013-09-29 23:13:20', 121, 'dfgdfgdfg', './public/images/Alien 1.bmp', 'incomplete'),
(27, 'Adukala', 3, 3, '2012-12-02 22:15:00', '2013-09-30 05:48:17', 121, 'sdfgdfsgdfgdfsg', './public/images/Birthday Cake.bmp', 'incomplete');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `restId` int(11) NOT NULL,
  `menu` varchar(255) NOT NULL,
  `type` enum('Breakfast','Brunch','Lunch','Dinner') NOT NULL,
  `cost` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `restId` (`restId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `name`, `restId`, `menu`, `type`, `cost`) VALUES
(1, 'option1', 1, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"1300","Nonveg":"1300"}]'),
(2, 'option1', 2, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"1131","Nonveg":"1131"}]'),
(3, 'option1', 3, '/uploads/menu/sanchosmenu.jpg', 'Dinner', '[{"Veg":"1300","Nonveg":"1300"}]'),
(4, 'option1', 4, '/uploads/menu/sanchosmenu.jpg', 'Dinner', '[{"Veg":"1365","Nonveg":"1500"}]'),
(5, 'option1', 5, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"1000","Nonveg":"1200"}]'),
(6, 'option1', 6, '/uploads/menu/sanchosmenu.jpg', 'Dinner', '[{"Veg":"1000","Nonveg":"1000"}]'),
(7, 'option1', 7, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"1000","Nonveg":"1000"}]'),
(8, 'option1', 8, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"750","Nonveg":"750"}]'),
(9, 'option1', 9, '/uploads/menu/sanchosmenu.jpg', 'Dinner', '[{"Veg":"650","Nonveg":"750"}]'),
(10, 'option1', 10, '/uploads/menu/sanchosmenu.jpg', 'Dinner', '[{"Veg":"500","Nonveg":"500"}]'),
(11, 'option1', 11, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"650","Nonveg":"650"}]'),
(12, 'option1', 12, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"1500","Nonveg":"1500"}]'),
(13, 'option1', 13, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"850","Nonveg":"950"}]'),
(14, 'option1', 14, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"1200","Nonveg":"1200"}]'),
(15, 'option1', 15, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"1000","Nonveg":"1000"}]'),
(16, 'option1', 16, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"1500","Nonveg":"1500"}]'),
(17, 'option1', 17, '/uploads/menu/sanchosmenu.jpg', 'Dinner', '[{"Veg":"1500","Nonveg":"1500"}]'),
(18, 'option1', 18, '/uploads/menu/sanchosmenu.jpg', 'Lunch', '[{"Veg":"1500","Nonveg":"1500"}]'),
(19, 'option1', 19, '/uploads/menu/sanchosmenu.jpg', 'Dinner', '[{"Veg":"2000","Nonveg":"2000"}]');

-- --------------------------------------------------------

--
-- Table structure for table `participant`
--

CREATE TABLE IF NOT EXISTS `participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mealoId` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `participant`
--

INSERT INTO `participant` (`id`, `mealoId`, `uid`) VALUES
(1, 1, 1),
(2, 1, 6),
(3, 2, 2),
(4, 4, 1),
(5, 5, 1),
(6, 3, 1),
(7, 1, 2),
(8, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE IF NOT EXISTS `restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` longtext NOT NULL,
  `locationId` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(256) DEFAULT NULL,
  `cityId` int(11) NOT NULL,
  `maxTableSize` int(11) NOT NULL,
  `cuisine` varchar(80) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `note` text,
  `address` varchar(200) NOT NULL,
  `place` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `locationId` (`locationId`),
  KEY `cityId` (`cityId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`id`, `name`, `description`, `locationId`, `email`, `phone`, `cityId`, `maxTableSize`, `cuisine`, `picture`, `note`, `address`, `place`) VALUES
(1, 'Sancho''s Restaurante', 'Sancho?s is the second outlet of a popular Delhi restaurant, featuring the same menu and typical Tex-Mex ambience, which at the Mumbai branch means mud-caked walls, tables inlaid with fiesta ceramic and gaily patterned tableware. The place is bright and sunny so a good amount of sunlight flooding the space in the day, which is split into two sections by a pretty wall of undulating glass panes.', 1, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 8, 'Mexican', '/img/img.jpg', '', '604, Pinnacle House, P D Hinduja Junction & 15th Road, Khar, Mumbai', 'Khar West'),
(2, 'Trikaya', 'Trikaya takes inspiration from the Buddhist concept which means three beings embodied into one. This plush suburban resto-bar is located in the city?s Andheri district, and is the brainchild of three childhood friends from Mumbai - Kunal Deshmukh, director of Jannat, restaurateur Sahil Saigal and realtor Shiraz Patel. Chef Neelesh Limaye who has more than 20yrs of experience in the food industry has created nouvelle Asian dishes with a distinctive image having a common theme- Healthy & Flavorful. The bar has over 340 cocktails made only with foreign alcohol along with fresh fruit purees. Bar consultant Valentine Barboza from L.A.B (London Academy of Bartenders) has designed the bar menu, which is extensive, to say the least.', 2, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 10, 'Pan Asian', '/img/img.jpg', '', 'Meera Apartments, Juhu Versova Link Road, Seven Bungalows, Andheri West, Mumbai, Maharashtra, India 400061', 'Andheri West'),
(3, 'Smoke House Deli', 'Smoke House Deli is an all-day caf? and delicatessen. This award wining brand serves everything from pancakes to noshes, pastas to burgers and desserts to cocktails.', 3, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 12, 'Continental', '/img/img.jpg', '', 'Main Courtyard, High Street Phoenix, Phoenix Mills Compound, Senapati Bapat Marg, Lower Parel, Mumbai, MH 400013', 'Lower Parel'),
(4, 'The Table', 'Located just behind the Taj Hotel in Colaba, The Table is one of South Mumbai?s most stylish and unique restaurants. Chef Alex Sanchez uses the finest and freshest seasonal ingredients, to create the diverse and globally inspired menu.', 4, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 10, 'Modern American', '/img/img.jpg', '', 'Kalapesi Trust Building, Apollo Bunder Marg, Colaba, Mumbai, Maharashtra, India 400039', 'Colaba'),
(5, 'Aoi', 'The Aoi experience brings to Bandra an open, young, bright and affordable Japanese adventure which does not limit itself to cuisine alone! The interiors serve as a time machine that transports the diner to a small discerning Japanese caf? that personifies the cultural experience of a lively and vibrant Japan.', 5, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 8, 'Japanese', '/img/img.jpg', '', '1, Gloria, St John Baptist Road, Near Mount Mary Steps, Bandra West, Mumbai', 'Bandra West'),
(6, 'Out of the Blue Band', 'A wholesome meal experience with live music , candle lit dinner, lunch buffet. Is famous for sizzlers, italian pasta, fondue and grills with a full bar and wine list.', 6, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 12, 'World Cuisine', '/img/img.jpg', '', 'Le Sutra Hotel, 14 Union Park, Off Carter Road, Khar West, Mumbai', 'Khar West'),
(7, 'Out of the Blue Powa', 'A wholesome meal experience with live music , candle lit dinner, lunch buffet. Is famous for sizzlers, italian pasta, fondue and grills with a full bar and wine list.', 7, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 12, 'World Cuisine', '/img/img.jpg', '', 'Haiko Mall, Hiranandani Gardens,?Powai, Mumbai', 'Powai'),
(8, 'Lemon Grass', 'Oriental cuisine re-discovered. And elevated. Dishes from across Thailand, Burma, Mongolia & China, Live Veg stir fry kitchen with a street food ambiance, Well stocked Bar with a selection of moderately priced Imported & Domestic brands, Relaxing ambiance for Colleagues , friends & family.', 8, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 8, 'Pan Asian', '/img/img.jpg', '', '4, Carlton Court, Turner Pali Road Junction, Bandra West, Mumbai', 'Bandra West'),
(9, 'Lemon Grass Malad', 'Oriental cuisine re-discovered. And elevated. Dishes from across Thailand, Burma, Mongolia & China, Live Veg stir fry kitchen with a street food ambiance, Well stocked Bar with a selection of moderately priced Imported & Domestic brands, Relaxing ambiance for Colleagues , friends & family.', 9, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 8, 'Pan Asian', '/img/img.jpg', '', '106, 1st Floor, Palm Spring Building, Above Croma Link Road, Malad West, Mumbai', 'Malad West'),
(10, 'Pot Pourri?', 'This caf? serves authentic Continental and Mexican cuisine. Burgers, sandwiches & hot dogs are some of the specialties.?', 10, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 2, 6, 'World Cuisine', '/img/img.jpg', '', 'Ground Floor, Inorbit Mall, 2nd Entrance, Sector 30 A, Vashi, Mumbai', 'Vashi'),
(11, 'Caf? Mirabelle?', 'Caf? Mirabelle opens its doors to a delectable menu cooked with fresh, healthy ingredients and a heart full of Love! Come hear the birds chirp and the trees rustle while you enjoy our alfresco dining experience or some costa rican coffee in our quaint interiors.', 11, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 10, 'Continental', '/img/img.jpg', '', 'Temperance, St Xaverian Court, Near Rizvi College Of Hotel Management, Sherly Rajan Road, Bandra West, Mumbai', 'Bandra West'),
(12, 'Hakkasan', 'Designed by Gilles & Boissier, Hakkasan Mumbai is a 120 seat restaurant, with a Ling Ling dining room and a private dining room.', 12, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 12, 'Chinese', '/img/img.jpg', '', '206, Krystal, Waterfield Road, Bandra West, Mumbai', 'Bandra West'),
(13, 'JamJar Diner', 'An all american diner, open for Breakfast, Lunch and Dinner, located along the Versova stretch', 13, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 8, 'American', '/img/img.jpg', '', '7A & B, Arram Nagar 2, Behind Washing Bay, Yari Road, Versova, Mumbai', 'Versova'),
(14, 'Mia Cucina Bandra', 'Mia Cucina? which literally means My Kitchen, is an Italian Bistro offering a casual dinning experience with fine quality food and excellent service. The place is ideal to hang out with friends, grab a quick bite or even catch up over a business meeting. Meals will be served from noon to midnight.', 14, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 6, 'Italian', '/img/img.jpg', '', '16/17, Gasper Enclave, St. John Street, Palinaka, Bandra (W), Mumbai', 'Bandra West'),
(15, 'Mia Cucina Powai', 'Mia Cucina? which literally means My Kitchen, is an Italian Bistro offering a casual dinning experience with fine quality food and excellent service. The place is ideal to hang out with friends, grab a quick bite or even catch up over a business meeting. Meals will be served from noon to midnight.', 15, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 8, 'Italian', '/img/img.jpg', '', 'G3 Transocean, Hiranandani Business Park, Lake Boulevard Rd, Hiranandani Gardens, Powai, Mumbai', 'Powai'),
(16, 'Olive Bar & Kitchen', 'The Olive Bar & Kitchen in Mumbai is something of a landmark. A place where the city?s happy people congregate to dine well, to dip into an outstanding cellar, and to linger over laughter and conversation. Just like the city, Mumbai?s Olive is a bit of a chameleon: at Bar Nights on Thursdays, the place explodes with music and high spirits. But visit for Sunday Brunch, and it?s lazy laughter in a sunlit courtyard, where no one will hurry you from your table.', 16, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 10, 'World Cuisine', '/img/img.jpg', '', '14, Union Park, Khar West, Mumbai', 'Khar West'),
(17, 'Olive Bar & Kitchen', 'The Olive Bar & Kitchen in Mumbai is something of a landmark. A place where the city?s happy people congregate to dine well, to dip into an outstanding cellar, and to linger over laughter and conversation. Just like the city, Mumbai?s Olive is a bit of a chameleon: at Bar Nights on Thursdays, the place explodes with music and high spirits. But visit for Sunday Brunch, and it?s lazy laughter in a sunlit courtyard, where no one will hurry you from your table.', 17, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 10, 'World Cuisine', '/img/img.jpg', '', 'Amateur Riders Club, Mahalaxmi Race Course, Mahalaxmi, Mumbai', 'Mahalaxmi'),
(18, 'The Sassy Spoon', 'The menu put together by Chef Irfan Pabaney and Chef Rachel Goenka boasts of offerings that one will not find anywhere else in the city ? unusual combinations of flavours; twists on a traditional theme and surprising inspirations ? across starters; soups; salads; a lighter lunch menu(including some delectable open faced sandwiches); mains and divine desserts. All paired with over 100 types of wines and other beverages.', 18, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 8, 'World Cuisine', '/img/img.jpg', '', 'Ground Floor, Express Towers, RN Goenka Marg, Nariman Point, Mumbai, Maharashtra', 'Nariman Point'),
(19, 'Aurus', 'Aurus; the Latin word for Gold.\nFacing the golden sands of Juhu with its unadulterated seascape and gorgeous horizon tableau, Aurus ? a home by the sea, is a celebration of the senses, where nature meets luxury to bring you the best dining and lounge bar in Mumbai.', 19, 'support@mealo.in', '[{"phone1":"29945868","phone2":"39957969"}]', 1, 10, 'European', '/img/img.jpg', '', 'Nichani Kutir, Juhu Tara Road, Juhu, Mumbai', 'Juhu');

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
-- Table structure for table `token`
--

CREATE TABLE IF NOT EXISTS `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `auth_token` varchar(256) NOT NULL,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`id`, `uid`, `auth_token`, `time`) VALUES
(1, 121, 'b3afd0b8f21e59a90f61a526171fa9ffa6ee3164850e510c73e72ace216c25725112d0a9f01d82aab1fd20a939aa3f0b', 5259480),
(2, 121, 'f922d524db21d76ad7dd091778f67fb1e6f83885788c46425c8108a93fba069066b9286263a8248273cc21c85d2dec2b', 5259480),
(3, 1, '6e1717ddba8a7f25d8fe5e13ab73292e69bc1ea9782e41314da8914157f399710e3d65d63838ebbe8be5c05e05b2febe', 5259480),
(4, 121, '47d9f23595a2fc314d9de115c0b773e53ce2d843867ab099537aea2d8a44defa5f7bf3945272c0b5546903f361a920ff', 5259480),
(5, 121, 'ebc416c37691a57b9eef6f4bcb21070ae1bceb1ae639f865a6d150604ed40fe3e09912b5ba61153e853ec030c34e6966', 5259480),
(6, 121, 'ee543f41719193d41083206f79a2d57d7406312cb2e19c3420ad2d5ea76add4ada4f28e15041044af45d45e231c53f10', 5259480),
(7, 121, '55002d75abb2d305d5b918bea1db225d738ae0ef5b831e0e3e87cad9c5c31d9d5e83c3ceeaa6c498f2a8db4b9832a4c7', 5259480),
(8, 121, '80a0e4ab719e9975c6e4cd58da059d0e04055fb44b4edd1329e7240982cfe63edd6f673d5f59ff0d1ea6b10138716010', 5259480),
(9, 121, '6dd6bc3b48b2697e89dfa712e268cd892502aa23bf3928eb8b3398f4b74ba078924ec5b4301d0858009c6cce5c4ed1f4', 5259480),
(10, 121, '32756a0a544e3c3b1372e0f6807bc372bc12e68990c1c2bbb23496574a09cb24fbb0367fb9dbf9d11d68c7b9b5b28621', 5259480),
(11, 121, '92987e2d51bae1922c97d3a2ee89d8059408915347f7737f85d889b0f470ae3ecdd895ff04eea4a5af958f589fef816d', 5259480),
(12, 121, '60c41fea0793a2ea69db6b38d34b4db9ba4475cc05ff9ce82f879ee6f7c43fa5962da791ce83ffadab124334a1720bb8', 5259480),
(13, 121, '255e1dc32e2b96cb4c4eb4d96ded5a8d5e363beff9c25d4a4427e293e6512301e6350690c52d4b4b5d3f09d8802eeb52', 5259480),
(14, 121, '907523e2e20261b2a599ca253e865f448e5f87726fe05bbc49597d1457cb4cb22c4e6572df77c31712dff1a47a1991ba', 5259480),
(15, 121, '3c411738f103fa70ad6432e053aad9576e9570c74c0f0d26b937176c31064d70ccb1728cfc5636bb1af4e8ae7edda91e', 5259480),
(16, 121, '329da9109215616633fa00efa0ac71113f46ba8d620b36e324456c1b43a82129d4d1ec9d5cc7a7c9c9dfc8651d592087', 5259480),
(17, 121, '83022df442778cbff7528a720b324d9bc655fda281d50d4c199038af99c9ef542e2024fe75476a43307d134e091a400e', 5259480),
(18, 121, '91cae3924982d87bdb6503bc8d76abf1a4b0985ffcb35f9d42816a996f9ace298238003ed2d1476933ab2f3bdc22b715', 5259480),
(19, 121, 'c3ec0f0fba1658d6612413bfa1481bd1eecaf86459f49b54bd4f2b91fb170054af40b4a2288a194c10cf2133a10ba9ab', 5259480),
(20, 121, '75d7d8127d23b70234e4e8ba567a209024f4516c4dcb8d95208995b4ebce34b3b82c3144e822abb66061d2e20c37694f', 5259480),
(21, 121, '360a772e672f8b5fd79185224c1e3544cec49bee60cfca63f5a9b3b186b9ab19edcaced01bcc1abc298cb20e9a464b13', 5259480),
(22, 121, '611a1765d25d61e9103e71d441c26d3b99f55c36d9010edeeeee325918a01ba3f30e9db5ea5662f6a915f8bbf7dbda12', 5259480),
(23, 121, '91d04121f2365d47063e0440151a62fafe7033a78f845e4375f88ef8280b32e15c9e333517bbe47f3d89bf8af7013c69', 5259480);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `mealoid` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `status` enum('incomplete','complete','cancelled') NOT NULL,
  `paymentid` varchar(50) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `mealoid` (`mealoid`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10010082 ;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `uid`, `mealoid`, `name`, `amount`, `status`, `paymentid`, `time`) VALUES
(10010077, 121, 23, 'dfgdfg', 1300, 'incomplete', NULL, '2013-09-29 22:50:40'),
(10010078, 121, 24, 'dfgdfgdfg', 1365, 'incomplete', NULL, '2013-09-29 22:53:42'),
(10010079, 121, 25, 'hfghfgh', 1000, 'cancelled', '4353453453', '2013-09-29 23:08:47'),
(10010080, 121, 26, 'fdgdfgdf', 1131, 'cancelled', NULL, '2013-09-29 23:13:20'),
(10010081, 121, 27, 'Adukala', 1300, 'incomplete', NULL, '2013-09-30 05:48:17');

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
  `phone` varchar(15) DEFAULT NULL,
  `profileimg` varchar(256) NOT NULL,
  `role` varchar(15) NOT NULL,
  `facebook_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=122 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `fname`, `lname`, `email`, `username`, `password`, `phone`, `profileimg`, `role`, `facebook_id`) VALUES
(1, 'Sobin', 'Thomas', 'sobingt@gmail.com', 'sobingt', '3f810706ca0084b524efef355d00df91', '12345678', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(3, 'Fiona', 'Monroe', 'dolor@vitaedolor.edu', 'posuere cubilia Curae; Phasell', 'JUV17URR3WE', '(306) 940-5461', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(4, 'Adrienne', 'Wiggins', 'tristique.senectus.et@ornareFusce.com', 'dolor sit amet, consectetuer', 'KAU22OBW2JS', '(467) 162-0166', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(5, 'Erin', 'Morgan', 'ante.Vivamus.non@utquamvel.org', 'fringilla, porttitor vulputate', 'JIZ15ERP0XY', '(725) 631-7324', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(6, 'Autumn', 'Mckinney', 'elit@loremtristiquealiquet.edu', 'tempus,', 'YLZ95NCH1EE', '(194) 757-8211', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(7, 'Noel', 'Dotson', 'ligula.Donec.luctus@maurisSuspendissealiquet.ca', 'ligula', 'FZA18QSZ9WE', '(190) 565-3485', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(8, 'Lysandra', 'Mckinney', 'quis.tristique.ac@elitsed.co.uk', 'vitae diam. Proin dolor. Nulla', 'LDS43QCA6ZW', '(708) 864-4983', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(9, 'Jade', 'Kirkland', 'pede.nonummy.ut@odiotristiquepharetra.co.uk', 'placerat, augue. Sed molestie.', 'SDJ46RBR6RR', '(647) 433-7736', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(10, 'Cailin', 'Reed', 'Sed@senectusetnetus.org', 'Etiam laoreet, libero et trist', 'SQY00OTD2LU', '(992) 635-9132', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(11, 'Skyler', 'Kerr', 'eu@interdumlibero.edu', 'et', 'XTO88PKO7QZ', '(559) 813-3157', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(12, 'Hollee', 'Harris', 'orci@mattisInteger.org', 'eu tempor erat', 'JMO83JNS9GI', '(978) 859-2917', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(13, 'Macy', 'Lawrence', 'ac@ullamcorperDuiscursus.ca', 'ut, sem. Nulla', 'MTR06ZKE7IK', '(121) 817-8369', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(14, 'Camden', 'Fleming', 'Donec.sollicitudin@molestie.co.uk', 'euismod et, commodo at,', 'DFR72IUR4MA', '(952) 143-8275', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(15, 'Dominic', 'Vance', 'dolor.sit.amet@adipiscing.com', 'amet', 'EHW80CDW7QI', '(758) 162-4551', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(16, 'Allistair', 'Rosario', 'scelerisque@arcueu.net', 'eu, ultrices sit amet, risus.', 'LAU38WLZ7FQ', '(191) 908-1436', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(17, 'Luke', 'Hall', 'Ut.semper@sed.edu', 'Morbi', 'OMX38TFG7YM', '(404) 594-3096', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(18, 'Oprah', 'Lawson', 'Mauris@a.com', 'arcu eu', 'DVV01QUK8NI', '(483) 832-3732', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(19, 'Imelda', 'Ball', 'lorem.vehicula.et@imperdiet.net', 'risus quis diam', 'DQC96GPL6MZ', '(988) 461-5998', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(20, 'Colleen', 'Goff', 'pharetra.ut.pharetra@DuisgravidaPraesent.co.uk', 'pede. Praesent eu dui.', 'FVG27YNJ4EW', '(417) 254-3142', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(21, 'Aladdin', 'Mercer', 'non.lobortis@aliquetmolestie.edu', 'ut cursus luctus,', 'TSY00TYN1JS', '(979) 794-1255', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(22, 'Lamar', 'Mcconnell', 'lobortis@Nuncquis.net', 'Duis sit amet diam', 'VKY74YNJ4QT', '(364) 223-5461', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(23, 'Unity', 'Dickerson', 'Phasellus.libero.mauris@tacitisociosqu.net', 'erat,', 'AZH97SXH0KX', '(865) 378-6323', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(24, 'Jordan', 'Cain', 'urna.suscipit@Nulla.org', 'at sem molestie sodales. Mauri', 'KYD69WKV1MG', '(138) 566-3205', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(25, 'Mason', 'King', 'nec.mollis.vitae@metusAliquamerat.com', 'egestas. Sed', 'LPU52RLR5PE', '(764) 610-3533', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(26, 'Bert', 'Battle', 'tristique.pellentesque.tellus@vulputate.ca', 'pede blandit congue.', 'MAI25PYA2MQ', '(522) 984-0194', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(27, 'Judith', 'Bradley', 'feugiat.nec@ametconsectetueradipiscing.co.uk', 'quam a felis', 'PAJ92YNG9VS', '(629) 828-3203', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(28, 'Nichole', 'Lee', 'vitae.mauris@arcuNuncmauris.co.uk', 'ultrices, mauris ipsum porta', 'IGW71ERS4QN', '(227) 110-9429', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(29, 'Ori', 'Wilson', 'non.lorem@mi.org', 'dui', 'GMG02LGW1RN', '(677) 589-4737', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(30, 'Nomlanga', 'Benjamin', 'Curabitur.dictum.Phasellus@commodo.ca', 'sed orci lobortis augue', 'NVO79TFF6JW', '(206) 944-8921', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(31, 'Nayda', 'Wiley', 'vehicula@pellentesque.com', 'Etiam vestibulum massa rutrum', 'JEW89UQD9HN', '(845) 530-9292', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(32, 'Hamilton', 'Nieves', 'amet@nec.edu', 'dolor sit', 'BTE96CSH2SO', '(759) 303-2952', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(33, 'Cecilia', 'Walton', 'metus.Vivamus.euismod@convallisdolor.net', 'pellentesque a, facilisis', 'SQE85VYG1EY', '(794) 724-0546', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(34, 'Randall', 'Montgomery', 'Vestibulum.ante@nonummyipsumnon.net', 'ultricies sem magna nec', 'EJH32VEE0HJ', '(193) 565-0604', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(35, 'Emily', 'Salas', 'Pellentesque@Aeneaneget.co.uk', 'convallis ligula.', 'PLD98KTZ5VG', '(982) 338-7357', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(36, 'Shellie', 'Sutton', 'eu.euismod@tempordiamdictum.edu', 'Phasellus dolor elit, pellente', 'VHW91RJY6YU', '(986) 210-0836', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(37, 'Nash', 'Duffy', 'at.auctor@luctus.org', 'dapibus gravida.', 'VBF70KKJ3BI', '(191) 713-7121', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(38, 'Roary', 'Tanner', 'et.magnis@eget.ca', 'erat volutpat. Nulla facilisis', 'MLY71ZCP3LQ', '(756) 827-1093', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(39, 'Ciaran', 'Quinn', 'ante@orci.com', 'Nunc pulvinar arcu et', 'CDM08RAY2KJ', '(909) 592-2022', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(40, 'Illiana', 'Hughes', 'Cum.sociis.natoque@et.edu', 'Nunc ullamcorper,', 'EKW64SIM6PX', '(159) 908-1394', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(41, 'Kyra', 'Goodwin', 'Nullam.enim.Sed@nibh.ca', 'lorem,', 'HHR19DVH6MW', '(553) 544-3672', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(42, 'Amethyst', 'Garner', 'nunc.ac@erategettincidunt.co.uk', 'id nunc interdum', 'DTB78AXS3NE', '(206) 641-0777', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(43, 'Aiko', 'Scott', 'justo@elitpharetraut.com', 'sed leo. Cras vehicula', 'ZTD05ABK7JY', '(959) 614-7125', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(44, 'Teagan', 'Daniel', 'purus.accumsan@enimNuncut.co.uk', 'condimentum.', 'JBL50ZOE3GN', '(310) 372-7539', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(45, 'Alea', 'Dyer', 'urna@ac.org', 'Ut nec', 'FPB61DQQ3AX', '(830) 968-1335', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(46, 'Daniel', 'Griffith', 'auctor.quis.tristique@ategestasa.com', 'luctus lobortis.', 'IKV30YNS6VS', '(560) 666-4707', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(47, 'Eugenia', 'Dudley', 'metus@lectussit.edu', 'magna. Sed eu eros. Nam', 'KHN26PEE3UA', '(137) 193-7317', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(48, 'Charde', 'Hood', 'et@sitamet.com', 'bibendum ullamcorper. Duis cur', 'JBX82OMM7UH', '(785) 595-8699', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(49, 'Jillian', 'Brock', 'eu.nibh@sollicitudincommodo.com', 'ac facilisis facilisis, magna', 'VBQ79YGL4AG', '(770) 329-8167', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(50, 'Basia', 'Camacho', 'mi.lorem.vehicula@risusDonecegestas.org', 'ut mi. Duis risus odio,', 'BRA63ZQQ4AQ', '(664) 797-6783', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(51, 'Joy', 'Trujillo', 'penatibus.et@vitaeodio.ca', 'dolor sit amet, consectetuer a', 'PXR65CPF7AG', '(469) 839-5063', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(52, 'Griffin', 'Cobb', 'elit@Cumsociis.co.uk', 'Suspendisse', 'YSK63ZSX2LX', '(585) 469-2199', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(53, 'Jenette', 'Freeman', 'arcu@lectus.org', 'mollis', 'WBM27UGL6LX', '(687) 123-0559', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(54, 'Laith', 'Woods', 'tincidunt@SuspendisseeleifendCras.org', 'id,', 'FXO61HMK7DV', '(677) 380-6861', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(55, 'Raphael', 'Clayton', 'mauris@nullaIntegervulputate.org', 'Aliquam tincidunt,', 'ZNV52YVR3OV', '(215) 943-9115', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(56, 'Gisela', 'Wiggins', 'eleifend.non.dapibus@consectetuer.org', 'dui. Fusce diam', 'IMM10RDW3LK', '(265) 750-0412', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(57, 'Alexander', 'Leonard', 'congue@hymenaeos.org', 'eget ipsum. Suspendisse', 'IVF80GMD0WP', '(502) 177-0822', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(58, 'Carla', 'Espinoza', 'sollicitudin.orci.sem@aliquam.net', 'odio tristique', 'LSE65EXA3ZW', '(849) 156-8551', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(59, 'Rose', 'Puckett', 'et.rutrum@velit.org', 'dui, in sodales elit erat', 'TGN99BCV0KU', '(932) 838-5231', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(60, 'Hadassah', 'Craft', 'auctor.nunc.nulla@Nullaegetmetus.edu', 'convallis in,', 'YYD48BNZ8PK', '(657) 931-7931', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(61, 'Beatrice', 'Pruitt', 'imperdiet.nec@maurisrhoncus.edu', 'velit dui, semper et,', 'WPH00EBO1XE', '(657) 350-3207', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(62, 'Herman', 'Carr', 'mauris.erat@sed.co.uk', 'parturient', 'GAF50HSB8WY', '(145) 770-8128', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(63, 'Tyrone', 'Nguyen', 'neque@diamdictum.org', 'quam vel', 'COH30HPU3LR', '(341) 818-8900', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(64, 'Samson', 'Waters', 'lacus.pede.sagittis@aliquetvel.co.uk', 'neque. In ornare sagittis feli', 'GXB52DVU9EG', '(646) 728-6086', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(65, 'Charles', 'Moore', 'interdum.Nunc@miAliquam.edu', 'ipsum dolor sit', 'PSR62XTA6RF', '(926) 609-4602', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(66, 'Denton', 'Cummings', 'et.netus.et@Sed.net', 'malesuada fames', 'PWO25TEH8WY', '(982) 642-5986', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(67, 'Chelsea', 'Buckner', 'a.dui.Cras@vestibulumneceuismod.ca', 'ut, pellentesque eget, dictum', 'JJD96QRV8MS', '(845) 119-3781', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(68, 'Flavia', 'Bernard', 'leo@luctus.edu', 'at, egestas a, scelerisque', 'JBK59CDQ9AC', '(685) 296-1249', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(69, 'Jennifer', 'Pittman', 'fermentum@necmollisvitae.edu', 'velit', 'BKZ48XOA5MB', '(619) 229-9413', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(70, 'Hunter', 'Norman', 'Suspendisse@lectusante.net', 'lacus. Cras interdum.', 'ROI60GOP2CC', '(372) 395-1893', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(71, 'Chava', 'Griffin', 'sit@duiFuscealiquam.edu', 'Suspendisse non leo.', 'CFM48NRK1YN', '(322) 542-0609', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(72, 'Yetta', 'Ewing', 'dolor@odioPhasellus.org', 'sed consequat auctor, nunc', 'KUZ92VKW2OV', '(770) 125-2213', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(73, 'Desirae', 'Cain', 'eu.enim@a.net', 'adipiscing elit. Etiam laoreet', 'NAO49UII6PX', '(536) 539-0521', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(74, 'Troy', 'Lester', 'nibh@Duis.ca', 'Pellentesque habitant morbi tr', 'KKC98ZTG3KV', '(381) 945-9411', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(75, 'Mason', 'Barber', 'leo.Morbi.neque@ipsumporta.org', 'Nam', 'MOD55AOH2XS', '(116) 300-7948', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(76, 'Carlos', 'Camacho', 'ultrices.Duis.volutpat@a.net', 'tincidunt dui augue', 'KBF56TOF0UD', '(782) 403-3838', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(77, 'Oren', 'Knapp', 'dui@dolorDonec.edu', 'Curabitur', 'SMS90JQO5RJ', '(742) 973-3126', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(78, 'Ann', 'Wallace', 'tristique@ligulaNullam.com', 'massa non ante bibendum', 'WKC53DYZ6MQ', '(110) 318-6408', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(79, 'Ayanna', 'Burch', 'vitae.posuere.at@Sed.net', 'odio semper', 'KFM48UQT7IG', '(434) 575-3494', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(80, 'Eden', 'Bender', 'Sed.nunc@pharetra.ca', 'interdum', 'PMI09DVP8PX', '(293) 540-0840', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(81, 'Demetrius', 'Peters', 'dui@nuncrisusvarius.ca', 'montes, nascetur', 'PXA99ZBU5XK', '(504) 868-8672', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(82, 'Quinlan', 'Wilson', 'Morbi.accumsan.laoreet@acmieleifend.com', 'elementum sem,', 'WWB87AVV8LT', '(297) 674-5512', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(83, 'Shannon', 'Steele', 'habitant@risusodioauctor.net', 'augue.', 'VYD88XXQ7SB', '(599) 357-6027', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(84, 'Duncan', 'Carr', 'sagittis.lobortis@Crassedleo.org', 'gravida sit amet, dapibus', 'SML83GTG9MY', '(998) 924-7840', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(85, 'Mercedes', 'Richmond', 'Duis@eros.net', 'In at pede. Cras', 'GKH62QZZ8WL', '(884) 786-1556', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(86, 'Len', 'Clay', 'elit.sed@placeratorci.co.uk', 'erat. Vivamus', 'SLU01ARD0OA', '(538) 817-4239', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(87, 'Unity', 'Tran', 'nec@Aeneaneget.edu', 'et, eros. Proin', 'JHI12MEY5EM', '(668) 549-2925', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(88, 'Wyatt', 'Cline', 'fringilla.Donec@nibhQuisque.net', 'dis parturient montes,', 'QXX90FLG1AK', '(660) 515-4357', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(89, 'Shelly', 'Juarez', 'iaculis.enim.sit@euaugue.org', 'tellus, imperdiet', 'AAW99YEL1HL', '(690) 641-1947', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(90, 'Micah', 'Gordon', 'in@atfringilla.edu', 'amet', 'ABF90FWE6AM', '(164) 228-3478', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(91, 'Cassidy', 'Hobbs', 'Vivamus@cursus.com', 'euismod', 'JDZ60ZVX1LY', '(655) 178-8026', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(92, 'Ursa', 'Hunter', 'odio@enimNuncut.co.uk', 'dictum.', 'WKI89JVU2AG', '(268) 775-5668', 'https://graph.facebook.com/sobingt/picture', 'admin', NULL),
(93, 'Dieter', 'Little', 'nec.ligula@elitdictumeu.org', 'vitae mauris sit amet', 'QNP93OHF3OF', '(678) 556-9126', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(94, 'Acton', 'Knapp', 'Nullam@Inatpede.ca', 'aliquam, enim', 'TXA38JXD5HS', '(894) 739-3305', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(95, 'Zelda', 'Brady', 'Aenean@velitjusto.co.uk', 'non dui nec urna suscipit', 'KSD40ZUY1KF', '(821) 395-2293', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(96, 'Shaeleigh', 'Tanner', 'ac.mattis@accumsan.co.uk', 'amet luctus vulputate, nisi se', 'CKQ28RFQ6JA', '(822) 951-4743', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(97, 'Caesar', 'Finley', 'tellus@eget.ca', 'enim,', 'KDS03NSO1IY', '(211) 416-5640', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(98, 'Alec', 'Lynn', 'nec@nascetur.ca', 'quis lectus. Nullam suscipit,', 'XCT61CDW6HE', '(643) 784-3417', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(99, 'Inga', 'Carpenter', 'dui@scelerisquelorem.com', 'nibh.', 'WAF66JST2KA', '(404) 773-2173', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(100, 'Tallulah', 'Chang', 'ut.molestie@Integersemelit.net', 'pulvinar', 'VAB06RKJ4PT', '(597) 975-2969', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(101, 'Eve', 'Lopez', 'mauris@arcuetpede.net', 'Sed neque. Sed', 'VGG82WOR2ZG', '(142) 839-3699', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(102, 'Lionel', 'Cross', 'egestas.lacinia@Duis.net', 'ac orci. Ut semper', 'APY24GDA9JZ', '(234) 418-3442', 'https://graph.facebook.com/sobingt/picture', 'regular', NULL),
(105, 'admin', 'admin', 'admin@gmail.com', 'admin', '3f810706ca0084b524efef355d00df91', '[{"phone1":"299', 'https://graph.facebook.com/sobingt/picture', 'regular', '2147483647'),
(106, 'admin', 'admin', 'admin@gmail.com', 'admin', '3f810706ca0084b524efef355d00df91', '111111111111111', 'https://graph.facebook.com/sobingt/picture', 'regular', '2147483647'),
(107, 'Cody', 'Redfern', 'codyredferns@gmail.com', 'cody.redfern.1', '619304eeaefe3f0afbc9e2d3f34c6c64', NULL, 'https://graph.facebook.com/undefined/picture', 'regular', NULL),
(108, 'Cody', 'Redfern', 'codyredferns@gmail.com', 'cody.redfern.1', 'db8af847fd5e24ad335a99a1d7fa8ea2', NULL, 'https://graph.facebook.com/100004110845179/picture', 'regular', '2147483647'),
(109, 'Sobin', 'Thomas', 'sobingt@gmail.com', 'sobingt', '47abc9eeaba9a275f9cf903118bd96fb', NULL, 'https://graph.facebook.com/100000483391087/picture', 'regular', NULL),
(110, 'Sobin', 'Thomas', 'sobingt@gmail.com', 'sobingt', '30521d9541e51236721885c3c6fb1fe1', NULL, 'https://graph.facebook.com/100000483391087/picture', 'regular', NULL),
(111, 'Sobin', 'Thomas', 'sobingt@gmail.com', 'sobingt', 'c730936d2947fa1b74f4fc485a922688', NULL, 'https://graph.facebook.com/100000483391087/picture', 'regular', NULL),
(121, 'Sobin', 'Thomas', 'sobingt@gmail.com', 'sobingt', 'c984e33eebd29bc2ac5d3d8a11df56df', NULL, 'https://graph.facebook.com/100000483391087/picture', 'regular', '100000483391087');

-- --------------------------------------------------------

--
-- Structure for view `attendance`
--
DROP TABLE IF EXISTS `attendance`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `attendance` AS select `id` AS `mealid`,count(`participant`.`mealoId`) AS `attend` from (`mealo` left join `participant` on((`participant`.`mealoId` = `id`))) group by `id`;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_city_uid` FOREIGN KEY (`city`) REFERENCES `city` (`id`);

--
-- Constraints for table `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`restId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`locationId`) REFERENCES `geolocation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurant_ibfk_2` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
