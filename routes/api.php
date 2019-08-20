<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
use Illuminate\Http\Request;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('register', 'Auth\TicketsController@register');
Route::post('login', 'Auth\TicketsController@login');


Route::middleware('auth:api')->post('/logout', function (Request $request) {
    
    if (auth()->user()) {
        $user = auth()->user();
        $user->api_token = null; // clear api token
        $user->save();

        return response()->json([
            'message' => 'Thank you for using our application',
        ]);
    }
    
    return response()->json([
        'error' => 'Unable to logout user',
        'code' => 401,
    ], 401);
});


// CRUD tickets

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->get('/gettickets', function (Request $request) {

    $tickets = DB::table('ticket')
    ->select('ticket.*', 'users.name as username')
    ->leftJoin('users', 'users.id', '=', 'ticket.users_id')
    ->orderBy('ticket.id', 'DESC')
    ->get();
    return response()->json($tickets, 201);
   
});
Route::middleware('auth:api')->post('/createticket', function (Request $request) {
        $ticket = new App\Ticket;
        $id_username = DB::table('users')->where('email', $request->email)->first()->id;

        $ticket->name = $request->name;
        $ticket->ticket_requested = $request->ticket_requested;
        $ticket->users_id = $id_username;

        $resp = $ticket->save();
    
        if ($resp) {
            return response()->json($resp, 201);
        };
        return response()->json([
            'error' => 'Unable to delete',
            'code' => 401,
        ], 401);
});

Route::middleware('auth:api')->post('/editticket', function (Request $request) {

    $id_username = DB::table('users')->where('email', $request->email)->first()->id;
    $ticket = App\Ticket::find($request->id);
    $ticket->name = $request->name;
    $ticket->ticket_requested = $request->ticket_requested;
    $ticket->users_id = $id_username;

    $resp = $ticket->save();
    
    if ($resp) {
        return response()->json($resp, 201);
    };
    return response()->json([
        'error' => 'Unable to delete',
        'code' => 401,
    ], 401);


});
Route::middleware('auth:api')->post('/deleteticket', function (Request $request) {

    $deletedRows = App\Ticket::where('id', $request->id)->delete();
    
    if ($deletedRows) {
        return response()->json($deletedRows, 201);
    };
    return response()->json([
        'error' => 'Unable to delete',
        'code' => 401,
    ], 401);
});

Route::middleware('auth:api')->post('/requestticketticket', function (Request $request) {

    $ticket = App\Ticket::find($request->id);
    $ticket->ticket_requested = 1;
    $resp = $ticket->save();
    
    if ($resp) {
        return response()->json($resp, 201);
    };
    return response()->json([
        'error' => 'Unable to delete',
        'code' => 401,
    ], 401);


});

Route::middleware('auth:api')->post('/getusertickets', function (Request $request) {

    $tickets = DB::table('ticket')
    ->select('ticket.*', 'users.name as username')
    ->leftJoin('users', 'users.id', '=', 'ticket.users_id')
    ->where('users.id', $request->user_id)
    ->orderBy('ticket.id', 'DESC')
    ->get();
    return response()->json($tickets, 201);
   
});







