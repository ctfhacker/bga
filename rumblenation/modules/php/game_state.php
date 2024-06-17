<?php

/*

Assumes the following table to store game states:

CREATE TABLE IF NOT EXISTS `game_state` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    length INT,
    state LONGTEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

*/

class PlayerState {
    public function __construct(
        public $warriors = 18,
        public $played_warlord = false,
        public $played_action = false,
    ) {}
}

class Region {
    public function __construct(
        public $score = 0,
        public $pieces = [0, 0, 0, 0],
    ) {}
}

class BoardGameState {
    public function __construct(
        public $players = [],
        public $regions = [],
    ) {
        // Initialize the players
        for($x = 0; $x < 4; $x++) {
            $this->players[] = new PlayerState();
        }

        // Initialize the regions
        for($x = 2; $x <= 12; $x++) {
            $this->regions[] = new Region();
        }
    }

    public function __toString() {
        return json_encode($this);
    }
}

function send_state_to_db($conn, $state) {
    // Dump the class properties as a json blob. Use json instead of `serialize`
    // to avoid calling magic functions when calling `unserialize` since we can't
    // trust database values.
    $ser = json_encode($state);

    // Insert the current state into the database
    $sql = "INSERT INTO game_state (length, state) VALUES (" . strlen($ser) . ",'" . $ser . "')";
    $conn->DbQuery( $sql );
}

function get_state_from_db($conn): BoardGameState {
    // Get the previously known state from the database
    $sql = "SELECT state FROM game_state ORDER BY id DESC LIMIT 1";
    $res = $conn->DbQuery( $sql );
    $row = mysql_fetch_assoc($res);
    $state_from_db = json_decode($row['state']);

    // Create a new state to return from the function
    $state = new BoardGameState();

    // Get the class properties of this class so that we only set
    // valid properties of the class (can't trust DB values)
    $class_properties = array_keys(get_object_vars($state));

    // For each value found from the database that is an actual class
    // property, set it in the class
    foreach($state_from_db as $key => $value) {
        if(in_array($key, $class_properties)) {
            $state->$key = $value;
        } else {
            throw new BgaUserException("Key not found in BoardGameState: " . $key);
        }
    }

    return $state;
}
