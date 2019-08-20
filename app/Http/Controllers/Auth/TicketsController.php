<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;

class TicketsController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }


    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function register(Request $request)
    {

        
        
        $validator = Validator::make($request->json()->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed']
        ]);
        


        if ($validator->fails()) {
            
             return response()->json(['errors'=>$validator->errors()],400);
        } 
        
        $token  = Str::random(60);

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'user_type_id' => $request['user_type_id'],
            'password' => Hash::make($request['password']),
            'api_token' => $token
        ]);

        
        return response()->json(compact('user', 'token'), 201);

      

    
    }
    protected function login(Request $request){
        if (auth()->attempt(['email' => $request->input('email'), 'password' => $request->input('password')])) {
            // Authentication passed...
            $user = auth()->user();
            $user->api_token = str_random(60);
            $user->save();
            return response()->json(compact('user'), 201);
        }
        
        return response()->json([
            'error' => 'Unauthenticated user',
            'code' => 401,
        ], 401);

    }

    protected function logout(Request $request){
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
    }
}