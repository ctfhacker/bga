
-- ------
-- BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
-- rumblenation implementation : © <Your name here> <Your email address here>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-- -----

CREATE TABLE IF NOT EXISTS `game_state` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    length INT,
    state LONGTEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- Example 2: 
ALTER TABLE `player` ADD `player_first` INT UNSIGNED NOT NULL DEFAULT '0';
