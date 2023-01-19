<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public $name = '';
    public function person($id)
    {
        $about = About::find($id);
        $this->name = $about->name;
    }
    public function index()
    {
        return Inertia::render('About/Index', [
            'about' => About::all(),
            'country'=> Country::all(),
            'state' => State::all(),
            'city' => City::all(),
            'name' => $this->name
        ]);
    }

    public function store(Request $request)
    {
        // $request->validate([
        //     'name' => 'required',
        //     'email' => 'required'
        // ]);
        About::create([
            'name' => $request->name,
            'email' => $request->email
        ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\About  $about
     * @return \Illuminate\Http\Response
     */
    public function show(About $about)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\About  $about
     * @return \Illuminate\Http\Response
     */
    public function edit(About $about, $id)
    {
        return Inertia::render('About/Edit', [
            'about' => About::findorFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\About  $about
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $about = About::findorFail($id);
        $about->update([
            'name' => $request->name,
            'email' => $request->email
        ]);

        return redirect()->route('about');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\About  $about
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $about = About::findorFail($id);
        $about->delete();

        return redirect()->route('about');
    }
}
