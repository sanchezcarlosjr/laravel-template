<?php

namespace App\Http\Controllers;

use App\Models\AcademicBody;
use Illuminate\Http\Request;

class AcademicBodyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AcademicBody::orderBy('created_at', 'asc')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $academicUnit = AcademicBody::create([
                'prodep_key' => $request->prodep_key,
                'academic_unit_name' =>  $request->academic_unit_name,
                'register_date' => $request->register_date,
                'active' => $request->active,
                'leader_id' => $request->leader_id,
                'uabc_area_id' => $request->uabc_area_id,
                'prodep_area_id' => $request->prodep_area_id,
                'displine_id' => $request->displine_id,
                'des_id' => $request->des_id
        ]);
        return response()->json($academicUnit, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AcademicUnit  $academicUnit
     * @return \Illuminate\Http\Response
     */
    public function show(AcademicBody $academicUnit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AcademicUnit  $academicUnit
     * @return \Illuminate\Http\Response
     */
    public function edit(AcademicBody $academicUnit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AcademicUnit  $academicUnit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AcademicBody $academicUnit)
    {
        $academicUnit->update($request->all());
        return $academicUnit;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AcademicUnit  $academicUnit
     * @return \Illuminate\Http\Response
     */
    public function destroy(AcademicBody $academicUnit)
    {
        return $academicUnit->delete();
    }
}
