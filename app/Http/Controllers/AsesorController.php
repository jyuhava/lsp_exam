<?php

namespace App\Http\Controllers;

use App\Models\Asesor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AsesorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $asesors = Asesor::with('user')->paginate(10);
        
        return Inertia::render('PersonalData/Asesor/Index', [
            'asesors' => $asesors
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('PersonalData/Asesor/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'nip' => 'nullable|string|unique:asesors,nip',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => 'nullable|in:L,P',
            'alamat' => 'nullable|string',
            'no_telepon' => 'nullable|string|max:20',
            'pendidikan_terakhir' => 'nullable|string|max:255',
            'bidang_keahlian' => 'nullable|string|max:255',
            'sertifikat_asesor' => 'nullable|string|max:255',
            'masa_berlaku_sertifikat' => 'nullable|date',
        ]);

        DB::transaction(function () use ($request) {
            // Create user account
            $user = User::create([
                'name' => $request->nama_lengkap,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'asesor'
            ]);

            // Create asesor profile
            Asesor::create([
                'user_id' => $user->id,
                'nip' => $request->nip,
                'nama_lengkap' => $request->nama_lengkap,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'jenis_kelamin' => $request->jenis_kelamin,
                'alamat' => $request->alamat,
                'no_telepon' => $request->no_telepon,
                'pendidikan_terakhir' => $request->pendidikan_terakhir,
                'bidang_keahlian' => $request->bidang_keahlian,
                'sertifikat_asesor' => $request->sertifikat_asesor,
                'masa_berlaku_sertifikat' => $request->masa_berlaku_sertifikat,
            ]);
        });

        return redirect()->route('asesor.index')->with('success', 'Data asesor berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Asesor $asesor)
    {
        $asesor->load('user');
        
        return Inertia::render('PersonalData/Asesor/Show', [
            'asesor' => $asesor
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Asesor $asesor)
    {
        $asesor->load('user');
        
        return Inertia::render('PersonalData/Asesor/Edit', [
            'asesor' => $asesor
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Asesor $asesor)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $asesor->user_id,
            'nip' => 'nullable|string|unique:asesors,nip,' . $asesor->id,
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => 'nullable|in:L,P',
            'alamat' => 'nullable|string',
            'no_telepon' => 'nullable|string|max:20',
            'pendidikan_terakhir' => 'nullable|string|max:255',
            'bidang_keahlian' => 'nullable|string|max:255',
            'sertifikat_asesor' => 'nullable|string|max:255',
            'masa_berlaku_sertifikat' => 'nullable|date',
            'status' => 'required|in:aktif,non_aktif',
        ]);

        DB::transaction(function () use ($request, $asesor) {
            // Update user account
            $asesor->user->update([
                'name' => $request->nama_lengkap,
                'email' => $request->email,
            ]);

            // Update password if provided
            if ($request->filled('password')) {
                $asesor->user->update([
                    'password' => Hash::make($request->password)
                ]);
            }

            // Update asesor profile
            $asesor->update([
                'nip' => $request->nip,
                'nama_lengkap' => $request->nama_lengkap,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'jenis_kelamin' => $request->jenis_kelamin,
                'alamat' => $request->alamat,
                'no_telepon' => $request->no_telepon,
                'pendidikan_terakhir' => $request->pendidikan_terakhir,
                'bidang_keahlian' => $request->bidang_keahlian,
                'sertifikat_asesor' => $request->sertifikat_asesor,
                'masa_berlaku_sertifikat' => $request->masa_berlaku_sertifikat,
                'status' => $request->status,
            ]);
        });

        return redirect()->route('asesor.index')->with('success', 'Data asesor berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asesor $asesor)
    {
        DB::transaction(function () use ($asesor) {
            $asesor->user->delete(); // This will cascade delete the asesor record
        });

        return redirect()->route('asesor.index')->with('success', 'Data asesor berhasil dihapus');
    }
}
