<?php
include ("db.php");
$data = array();
//$query1 = "Select game_id, home_team, home_starts_left_side FROM games";
$query1 = "Select game_id, home_team, home_starts_left_side FROM games where home_team = 'LV'";// OR away_team = 'LV'";
$result1 = pg_query($connect, $query1);
if (pg_num_rows($result1) > 0) {
    while ($row = pg_fetch_array($result1)) {
        if($row['home_team'] != 'LV' && $row['home_starts_left_side'])
            $axes[$row['game_id']] = 1;
        if($row['home_team'] == 'LV' && $row['home_starts_left_side'])
            $axes[$row['game_id']] = -1;
    }
}
        $data[key($_POST)]['x']=array();
        $data[key($_POST)]['y']=array();
        $data[key($_POST)]['v']=array();
//$query1 = "Select game_id, home_team, home_starts_left_side FROM games where home_team = /'LV' OR away_team = /'LV'";
        $query = "Select type, main_location, period, game_id FROM events
                  where type = '" . key($_POST) . "'
                  and main_player_id = 58";

        if (key($_POST) == 'shot_attempt') {
            $query = "Select type, main_location, period, game_id FROM events
                      where  (type = 'blocked_shot' OR type = 'missed_shot' OR type = 'shot')
                      and main_player_id = 58" ;
        }
        $result = pg_query($connect, $query);
        if (pg_num_rows($result) > 0) {
            while ($row = pg_fetch_array($result)) {
                if(!empty($axes[$row['game_id']])){
                    $x = str_replace('(', '', $row['main_location']);
                    $y = str_replace(')', '', $row['main_location']);
                    $x = strstr($x, ',', true);
                    $y = strstr($y, ',', false);
                    $y = str_replace(',', '', $y);

                    $data['event'] = key($_POST);
                    array_push( $data[key($_POST)]['x'], (3.7*$x*pow((-1),($row['period']))*$axes[$row['game_id']] + 650));
                    array_push( $data[key($_POST)]['y'], (1.9*$y*pow((-1),($row['period']))*$axes[$row['game_id']] + 425));

                    if(pg_num_rows($result)<20)
                        array_push($data[key($_POST)]['v'],100);

                    if( pg_num_rows($result)>=20 && pg_num_rows($result)<=100)
                        array_push($data[key($_POST)]['v'],40);

                    if(pg_num_rows($result)>100)
                        array_push($data[key($_POST)]['v'],15);
                }
            }
        }
echo json_encode($data);
$_POST = array();
?>
