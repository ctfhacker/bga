/**
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * barbershoppertesthearts implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * barbershoppertesthearts.js
 *
 * barbershoppertesthearts user interface script
 * 
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter",
    "ebg/stock"
],
function (dojo, declare) {
    return declare("bgagame.barbershoppertesthearts", ebg.core.gamegui, {
        constructor: function(){
            console.log('barbershoppertesthearts constructor');

            // Each sprite in the spritesheet is 72x96
            this.card_width = 72;
            this.card_height = 96;
        },
        
        /*
            setup:
            
            This method must set up the game user interface according to current game situation specified
            in parameters.
            
            The method is called each time the game interface is displayed to a player, ie:
            _ when the game starts
            _ when a player refreshes the game page (F5)
            
            "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
        */
        
        setup: function( gamedatas )
        {
            console.log( "Starting game setup" );
            
            // Setting up player boards
            for( var player_id in gamedatas.players )
            {
                var player = gamedatas.players[player_id];
                         
                // TODO: Setting up players boards if needed
            }
            
            // TODO: Set up your game interface here, according to "gamedatas"

            // Player hand
            this.playerHand = new ebg.stock();

            // Add the handler for clicking on cards
            dojo.connect(
                this.playerHand, 
                'onChangeSelection', 
                this, 
                'onPlayerHandSelectionChanged');           

            this.playerHand.create(this, $('myhand'), this.card_width, this.card_height);

            // The spritesheet is 13x4
            this.playerHand.image_items_per_row = 13;

            for (var suit = 1; suit < 5; suit++) {
                for (var value = 2; value < 15; value++) {
                    var card_type_id = this.getCardUniqueId(suit, value);
                    this.playerHand.addItemType(
                        card_type_id, 
                        card_type_id, 
                        g_gamethemeurl + 'img/cards.jpg',
                        card_type_id);
                }
            }

            // Cards in player hand
            for (var i in this.gamedatas.hand) {
                var card = this.gamedatas.hand[i]       
                var suit = card.type;
                var value = card.type_arg;
                var id = this.getCardUniqueId(suit, value);
                this.playerHand.addToStockWithId(id, card.id);
            }

            // Cards on table
            for (var i in this.gamedatas.cardsontable) {                    
                var card = this.gamedatas.cardsontable[i];
                var suit = card.type;
                var value = card.type_arg;
                var player_id = card.location_arg;
                this.playCardOnTable(player_id, suit, value, card.id);
            }


            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            console.log( "Ending game setup" );
        },
       

        ///////////////////////////////////////////////////
        //// Game & client states
        
        // onEnteringState: this method is called each time we are entering into a new game state.
        //                  You can use this method to perform some user interface changes at this moment.
        //
        onEnteringState: function( stateName, args )
        {
            console.log( 'Entering state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Show some HTML block at this game state
                dojo.style( 'my_html_block_id', 'display', 'block' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName )
        {
            console.log( 'Leaving state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Hide the HTML block we are displaying only during this game state
                dojo.style( 'my_html_block_id', 'display', 'none' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }               
        }, 

        // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
        //                        action status bar (ie: the HTML links in the status bar).
        //        
        onUpdateActionButtons: function( stateName, args )
        {
            console.log( 'onUpdateActionButtons: '+stateName );
                      
            if( this.isCurrentPlayerActive() )
            {            
                switch( stateName )
                {
/*               
                 Example:
 
                 case 'myGameState':
                    
                    // Add 3 action buttons in the action status bar:
                    
                    this.addActionButton( 'button_1_id', _('Button 1 label'), 'onMyMethodToCall1' ); 
                    this.addActionButton( 'button_2_id', _('Button 2 label'), 'onMyMethodToCall2' ); 
                    this.addActionButton( 'button_3_id', _('Button 3 label'), 'onMyMethodToCall3' ); 
                    break;
*/
                }
            }
        },        

        ///////////////////////////////////////////////////
        //// Utility methods
        
        getCardUniqueId: function(suit, value) {
            return (suit - 1) * 13 + (value - 2);
        },

        playCardOnTable: function(player_id, suit, value, card_id) {
            // player_id => direction       
            dojo.place(this.format_block('jstpl_cardontable', {
                x: this.card_width * (value - 2),
                y: this.card_height * (suit - 1),
                player_id: player_id
            }), 'playertablecard_' + player_id);

            if (player_id != this.player_id) {
                // Opponent played a card. Move card from control panel
                this.placeOnObject('cardontable_' + player_id, 'overall_player_board_' + player_id);
            } else {
                // Current player played a card. If the card exists in hand, move it from
                // the hand to the table
                var card_in_hand = 'myhand_item_' + card_id;
                if ($(card_in_hand)) {
                    this.slideToObject(card_in_hand, 'playertablecard_' + player_id).play();
                    this.placeOnObject('cardontable_' + player_id, card_in_hand);
                    this.playerHand.removeFromStockById(card_id);
                }
            }

            // Regardless, move it to the final destination
            this.slideToObject('cardontable_' + player_id, 'playertablecard_' + player_id).play();
        },

        ///////////////////////////////////////////////////
        //// Player's action
        
        /*
        
            Here, you are defining methods to handle player's action (ex: results of mouse click on 
            game objects).
            
            Most of the time, these methods:
            _ check the action is possible at this game state.
            _ make a call to the game server
        
        */

        onPlayerHandSelectionChanged: function() {
            var items = this.playerHand.getSelectedItems();

            if (items.length > 0) {
                var action = 'playCard';
                if (this.checkAction(action, true)) {
                    // Can play a card
                    var card_id = items[0].id;
                    this.ajaxcall("/" + this.game_name + "/" + this.game_name + "/" + action + ".html", 
                        { id: card_id, lock: true }, 
                        true,
                        function(result) { },
                        function(error) { },
                    );

                    this.playerHand.unselectAll();
                } else if (this.checkAction('giveCards')) {
                    // Can give cards => let player select some cards
                } else {
                    this.playerHand.unselectAll();
                }
            }
        },
        
        /* Example:
        
        onMyMethodToCall1: function( evt )
        {
            console.log( 'onMyMethodToCall1' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'myAction' ) )
            {   return; }

            this.ajaxcall( "/barbershoppertesthearts/barbershoppertesthearts/myAction.html", { 
                                                                    lock: true, 
                                                                    myArgument1: arg1, 
                                                                    myArgument2: arg2,
                                                                    ...
                                                                 }, 
                         this, function( result ) {
                            
                            // What to do after the server call if it succeeded
                            // (most of the time: nothing)
                            
                         }, function( is_error) {

                            // What to do after the server call in anyway (success or failure)
                            // (most of the time: nothing)

                         } );        
        },        
        
        */

        
        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        /*
            setupNotifications:
            
            In this method, you associate each of your game notifications with your local method to handle it.
            
            Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                  your barbershoppertesthearts.game.php file.
        
        */
        setupNotifications: function()
        {
            console.log( 'notifications subscriptions setup' );
            
            dojo.subscribe('newHand', this, "notif_newHand");
            dojo.subscribe('playCard', this, "notif_playCard");
        },  

        notif_newHand: function(notif) {
            // We received a hand of 13 cards       

            for(var i in notif.args.cards) {
                var card = notif.args.cards[i];
                var suit = card.type;
                var value= card.type_arg;
                var card_uniq_id = this.getCardUniqueId(suit, value);
                this.playerHand.addToStockWithId(card_uniq_id, card.id);
            }
        },
            
        notif_playCard: function(notif) {
            // Play a card on the table
            this.playCardOnTable(
                notif.args.player_id, 
                notif.args.suit,
                notif.args.value,
                notif.args.card_id
            );
        }
   });             
});
