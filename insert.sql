INSERT INTO `mealo`.`user` (`uid`, `fname`, `lname`, `email`, `username`, `password`, `phone`, `role`) VALUES (NULL, 'Sobin', 'Thomas', 'sobingt@gmail.com', 'sobingt', 'hj34ktb32dsfsad423j763', '12345678', 'admin'), (NULL, 'Akshat', 'Verma', 'akshat@bitbrothers.in', 'akshat', 'cxvmzxkcjvhjdf7hjfkbdah', '3423524543', 'user');

INSERT INTO `city` (`id`, `city`) VALUES (NULL, 'mumbai');

INSERT INTO `mealo`.`geolocation` (`id`, `latitude`, `longitude`) VALUES (NULL, '19.055229', '72.830829'), (NULL, '19.0673821', '72.82274380000001'), (NULL, '18.9203886', '72.83013059999996');

INSERT INTO `mealo`.`restaurant` (`id`, `name`, `locationId`, `email`, `phone1`, `phone2`, `phone3`, `cityId`, `cuisine`, `picture`, `note`) VALUES (NULL, 'Spice Tree', '1', 'sobingt@gmail.com', '02226405161', '02226405161', '', '1', 'Chinese ', '', NULL);

INSERT INTO `mealo`.`restaurant` (`id`, `name`, `locationId`, `email`, `phone1`, `phone2`, `phone3`, `cityId`, `cuisine`, `picture`, `note`) VALUES (NULL, 'Out Of The Blue Restaurant', '2', 'bluerest@rest.com', '12345676', '', '', '1', 'American', '', NULL), (NULL, 'Leopold Cafe & Bar', '3', 'leapoldcafe@gmail.com', '423423542', '', '', '1', 'Mexican', '', NULL);

INSERT INTO `mealo`.`menu` (`id`, `restId`, `menu`, `type`) VALUES (NULL, '1', '', 'Breakfast');
INSERT INTO `mealo`.`menu` (`id`, `restId`, `menu`, `type`) VALUES (NULL, '1', '', 'Brunch');
INSERT INTO `mealo`.`menu` (`id`, `restId`, `menu`, `type`) VALUES (NULL, '2', '', 'Brunch'), (NULL, '2', '', 'Dinner'), (NULL, '1', '', 'Dinner'), (NULL, '2', '', 'Lunch'), (NULL, '2', '', 'Breakfast');


ALTER TABLE  `restaurant` ADD  `maxTableSize` INT NOT NULL AFTER  `cityId`

INSERT INTO `mealo`.`mealo` (`id`, `menuId`, `tablesize`, `time`, `created`, `uid`, `description`) VALUES (NULL, '1', '5', '2013-09-18 13:16:20', CURRENT_TIMESTAMP, '1', 'This is the description of description on description'), (NULL, '6', '7', '2013-09-19 07:20:19', CURRENT_TIMESTAMP, '1', 'This is the description of description on description');

INSERT INTO `mealo`.`mealo` (`id`, `menuId`, `tablesize`, `time`, `created`, `uid`, `description`) VALUES (NULL, '3', '5', '2013-09-18 13:16:20', CURRENT_TIMESTAMP, '1', 'This is the description of description on description'), (NULL, '5', '7', '2013-09-19 07:20:19', CURRENT_TIMESTAMP, '1', 'This is the description of description on description');