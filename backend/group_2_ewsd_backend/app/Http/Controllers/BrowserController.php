<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Browser;
use Illuminate\Http\Request;

class BrowserController extends Controller
{
    //already in descendaning count
    public function index(){
        $browsers = Browser::orderBy('count','desc')->get();
        return $this->sendResponse($browsers,"Browser List Retrieved",200);
    }
}
