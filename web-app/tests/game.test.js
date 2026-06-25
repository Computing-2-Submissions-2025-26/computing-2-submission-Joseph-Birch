//importing the functions to test
import * as Game from "../crabblet.js";

console.log(Game);

/**
 * Throws an error if the actual value does not exactly equal the expected value.
 * @param {*} actual
 * @param {*} expected
 * @param {string} message
 */
const throw_if_not_equal = function ( actual , expected , message ) {
    if ( actual !== expected ) {
        throw new Error(
            `${ message }\nExpected: ${ expected }\nActual: ${ actual }`
        );
    }
} ;

/**
 * Throws an error if the condition is false.
 * @param {boolean} condition
 * @param {string} message
 */
const throw_if_false = function ( condition , message ) {
    if ( ! condition ) {
        throw new Error( message ) ;
    }
} ;

describe( "Game Setup" , function ( ) {

    // Checks that a new game starts with blue as the current player.
    it( "A new game should start with blue as the current player" , function ( ) {
        const game = Game.createGame( ) ;

        throw_if_not_equal(
            Game.getCurrentPlayer( game ) ,
            "blue" ,
            "A new game did not start with blue to play."
        ) ;
    } ) ;

    // Checks that a new game starts with no winner and the playing status.
    it( "A new game should start with no winner and a playing status" , function ( ) {
        const game = Game.createGame( ) ;

        throw_if_not_equal(
            game.winner ,
            null ,
            "A new game should not have a winner."
        ) ;

        throw_if_not_equal(
            game.status ,
            "playing" ,
            "A new game should start with status 'playing'."
        ) ;
    } ) ;

    // Checks that every visible square on a new board is empty.
    it( "A new game should start with an empty visible board" , function ( ) {
        const game = Game.createGame( ) ;
        const visible_board = Game.getVisibleBoard( game ) ;

        visible_board.forEach( function ( row , row_index ) {
            row.forEach( function ( tile , col_index ) {
                if ( tile !== null ) {
                    throw new Error(
                        `Expected tile (${ row_index }, ${ col_index }) to be empty.`
                    ) ;
                }
            } ) ;
        } ) ;
    } ) ;

    // Checks that blue and red both begin with 6 reserve pieces.
    it( "Each player should start with 6 reserve pieces" , function ( ) {
        const game = Game.createGame( ) ;

        throw_if_not_equal(
            game.reserves.blue.length ,
            6 ,
            "Blue did not start with 6 reserve pieces."
        ) ;

        throw_if_not_equal(
            game.reserves.red.length ,
            6 ,
            "Red did not start with 6 reserve pieces."
        ) ;
    } ) ;

    // Checks that each player starts with 2 small, 2 medium, and 2 large pieces.
    it( "Each player should start with 2 pieces of each size" , function ( ) {
        const game = Game.createGame( ) ;

        const count_sizes = function ( pieces ) {
            return {
                small : pieces.filter( function ( piece ) {
                    return piece.size === 1 ;
                } ).length ,
                medium : pieces.filter( function ( piece ) {
                    return piece.size === 2 ;
                } ).length ,
                large : pieces.filter( function ( piece ) {
                    return piece.size === 3 ;
                } ).length
            } ;
        } ;

        const blue_counts = count_sizes( game.reserves.blue ) ;
        const red_counts = count_sizes( game.reserves.red ) ;

        throw_if_not_equal(
            blue_counts.small ,
            2 ,
            "Blue should start with 2 small pieces."
        ) ;
        throw_if_not_equal(
            blue_counts.medium ,
            2 ,
            "Blue should start with 2 medium pieces."
        ) ;
        throw_if_not_equal(
            blue_counts.large ,
            2 ,
            "Blue should start with 2 large pieces."
        ) ;

        throw_if_not_equal(
            red_counts.small ,
            2 ,
            "Red should start with 2 small pieces."
        ) ;
        throw_if_not_equal(
            red_counts.medium ,
            2 ,
            "Red should start with 2 medium pieces."
        ) ;
        throw_if_not_equal(
            red_counts.large ,
            2 ,
            "Red should start with 2 large pieces."
        ) ;
    } ) ;

} ) ;

describe( "Legal Moves" , function ( ) {

    // Checks that a reserve piece can be placed onto an empty board tile.
    it( "A reserve piece should be allowed to be placed on an empty tile" , function ( ) {
        const game = Game.createGame( ) ;

        const move = {
            from : { type : "reserve" , pieceId : "blue-1-1" } ,
            to : { row : 1 , col : 1 }
        } ;

        throw_if_not_equal(
            Game.isLegalMove( game , move ) ,
            true ,
            "A reserve piece should be allowed on an empty tile."
        ) ;
    } ) ;

    // Checks that a player cannot move a piece outside the 3x3 board.
    it( "A move outside the board should be illegal" , function ( ) {
        const game = Game.createGame( ) ;

        const move = {
            from : { type : "reserve" , pieceId : "blue-1-1" } ,
            to : { row : 3 , col : 0 }
        } ;

        throw_if_not_equal(
            Game.isLegalMove( game , move ) ,
            false ,
            "A move outside the board should be illegal."
        ) ;
    } ) ;

    // Checks that red cannot move first when it is blue's turn.
    it( "Red should not be allowed to play on blue's turn" , function ( ) {
        const game = Game.createGame( ) ;

        const move = {
            from : { type : "reserve" , pieceId : "red-1-1" } ,
            to : { row : 0 , col : 0 }
        } ;

        throw_if_not_equal(
            Game.isLegalMove( game , move ) ,
            false ,
            "Red should not be allowed to play before blue."
        ) ;
    } ) ;

    // Checks that a smaller piece cannot be placed on top of a larger piece.
    it( "A smaller piece should not be allowed to cover a larger piece" , function ( ) {
        let game = Game.createGame( ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "blue-3-1" } ,
                to : { row : 0 , col : 0 }
            }
        ) ;

        const move = {
            from : { type : "reserve" , pieceId : "red-1-1" } ,
            to : { row : 0 , col : 0 }
        } ;

        throw_if_not_equal(
            Game.isLegalMove( game , move ) ,
            false ,
            "A smaller piece should not be allowed to cover a larger piece."
        ) ;
    } ) ;

    // Checks that a larger piece can be placed on top of a smaller piece.
    it( "A larger piece should be allowed to cover a smaller piece" , function ( ) {
        let game = Game.createGame( ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "blue-1-1" } ,
                to : { row : 0 , col : 0 }
            }
        ) ;

        const move = {
            from : { type : "reserve" , pieceId : "red-2-1" } ,
            to : { row : 0 , col : 0 }
        } ;

        throw_if_not_equal(
            Game.isLegalMove( game , move ) ,
            true ,
            "A larger piece should be allowed to cover a smaller piece."
        ) ;
    } ) ;

    // Checks that a piece already on the board cannot be moved back onto the same square.
    it( "A board piece should not be allowed to move onto the same square" , function ( ) {
        let game = Game.createGame( ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "blue-1-1" } ,
                to : { row : 1 , col : 1 }
            }
        ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "red-1-1" } ,
                to : { row : 0 , col : 0 }
            }
        ) ;

        const move = {
            from : { type : "board" , row : 1 , col : 1 } ,
            to : { row : 1 , col : 1 }
        } ;

        throw_if_not_equal(
            Game.isLegalMove( game , move ) ,
            false ,
            "A board piece should not be allowed to move onto the same square."
        ) ;
    } ) ;

} ) ;

describe( "Winning" , function ( ) {

    // Checks that blue wins after making three visible pieces in a horizontal line.
    it( "Blue should win after making a horizontal line of three visible pieces" , function ( ) {
        let game = Game.createGame( ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "blue-1-1" } ,
                to : { row : 0 , col : 0 }
            }
        ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "red-1-1" } ,
                to : { row : 1 , col : 0 }
            }
        ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "blue-2-1" } ,
                to : { row : 0 , col : 1 }
            }
        ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "red-2-1" } ,
                to : { row : 1 , col : 1 }
            }
        ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "blue-3-1" } ,
                to : { row : 0 , col : 2 }
            }
        ) ;

        throw_if_not_equal(
            game.winner ,
            "blue" ,
            "Blue should be the winner after making a horizontal line of three."
        ) ;

        throw_if_not_equal(
            game.status ,
            "won" ,
            "The game should have status 'won' after a winning move."
        ) ;
    } ) ;

    // Checks that no more moves are legal after the game has already been won.
    it( "No move should be legal after the game has ended" , function ( ) {
        let game = Game.createGame( ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "blue-1-1" } ,
                to : { row : 0 , col : 0 }
            }
        ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "red-1-1" } ,
                to : { row : 1 , col : 0 }
            }
        ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "blue-2-1" } ,
                to : { row : 0 , col : 1 }
            }
        ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "red-2-1" } ,
                to : { row : 1 , col : 1 }
            }
        ) ;

        game = Game.applyMove(
            game ,
            {
                from : { type : "reserve" , pieceId : "blue-3-1" } ,
                to : { row : 0 , col : 2 }
            }
        ) ;

        const move_after_win = {
            from : { type : "reserve" , pieceId : "red-3-1" } ,
            to : { row : 2 , col : 2 }
        } ;

        throw_if_not_equal(
            Game.isLegalMove( game , move_after_win ) ,
            false ,
            "No move should be legal after the game has already been won."
        ) ;
    } ) ;

} ) ;
