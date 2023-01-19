<?php

namespace App\Http\Controllers;

use App\Models\Wilayah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WilayahController extends Controller
{
    public function index()
    {
        return Inertia::render('Wilayah', [
            'title' => 'Wilayah',
            'data' => Wilayah::where(DB::raw('LENGTH(kode)'), 2)->get(),
            'provinsi' => []
        ]);
    }

    public function getProvinsi(Request $request)
    {
        // $request->validate([
        //     'first_name' => ['required', 'max:50'],
        // ]);
        // dd($request->provinsi);
        return Inertia::render('Wilayah',[
            'data' => Wilayah::where(DB::raw('LENGTH(kode)'), 2)->get(),
            'provinsi' => Wilayah::where(DB::raw('LENGTH(kode)'), 5)->where('kode', 'like', $request->provinsi . '%')->get()
        ]);
    }
}
