
CREATE TABLE `userroles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `userroles` (`id`, `role`, `username`) VALUES(1, 'admin', 'manager');
