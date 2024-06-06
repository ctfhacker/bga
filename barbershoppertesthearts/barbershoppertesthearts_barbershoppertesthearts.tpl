{OVERALL_GAME_HEADER}

<div id="content">

<div id="playertables">
    <!-- BEGIN playerhandblock -->
    <div class="playertable whiteblock playertable_{DIR}">
        <div class="playertablename" style="color:#{PLAYER_COLOR}">
            no player here
        </div>
        <div class="playertablecard" id="playertablecard_{PLAYER_ID}">
        </div>
    </div>
    <!-- END playerhandblock -->

</div>

<div id="myhand_wrap" class="whiteblock">
    <h3>{MY_HAND}</h3>
    <div id="myhand">
        <div class="playertablecard"></div>
    </div>
</div>

</div> <!-- content div -->

<!-- <canvas id="particleCanvas"></canvas> -->

<script type="text/javascript">
</script>


<script>
var jstpl_cardontable = '<div class="cardontable" id="cardontable_${player_id}" style="background-position:-${x}px -${y}px"></div>';
</script>


{OVERALL_GAME_FOOTER}
