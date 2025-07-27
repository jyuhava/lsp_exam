<?php

namespace App\Http\Controllers;

use App\Models\Asesi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AsesiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $asesis = Asesi::with('user')->paginate(10);
        
        return Inertia::render('PersonalData/Asesi/Index', [
            'asesis' => $asesis
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('PersonalData/Asesi/Create');
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
            'nim' => 'nullable|string|unique:asesis,nim',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => 'nullable|in:L,P',
            'alamat' => 'nullable|string',
            'no_telepon' => 'nullable|string|max:20',
            'program_studi' => 'nullable|string|max:255',
            'semester' => 'nullable|string|max:10',
            'ipk' => 'nullable|string|max:10',
            'instansi_asal' => 'nullable|string|max:255',
        ]);

        DB::transaction(function () use ($request) {
            // Create user account
            $user = User::create([
                'name' => $request->nama_lengkap,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'asesi'
            ]);

            // Create asesi profile
            Asesi::create([
                'user_id' => $user->id,
                'nim' => $request->nim,
                'nama_lengkap' => $request->nama_lengkap,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'jenis_kelamin' => $request->jenis_kelamin,
                'alamat' => $request->alamat,
                'no_telepon' => $request->no_telepon,
                'program_studi' => $request->program_studi,
                'semester' => $request->semester,
                'ipk' => $request->ipk,
                'instansi_asal' => $request->instansi_asal,
            ]);
        });

        return redirect()->route('asesi.index')->with('success', 'Data asesi berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Asesi $asesi)
    {
        $asesi->load('user');
        
        return Inertia::render('PersonalData/Asesi/Show', [
            'asesi' => $asesi
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Asesi $asesi)
    {
        $asesi->load('user');
        
        return Inertia::render('PersonalData/Asesi/Edit', [
            'asesi' => $asesi
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Asesi $asesi)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $asesi->user_id,
            'nim' => 'nullable|string|unique:asesis,nim,' . $asesi->id,
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => 'nullable|in:L,P',
            'alamat' => 'nullable|string',
            'no_telepon' => 'nullable|string|max:20',
            'program_studi' => 'nullable|string|max:255',
            'semester' => 'nullable|string|max:10',
            'ipk' => 'nullable|string|max:10',
            'instansi_asal' => 'nullable|string|max:255',
            'status' => 'required|in:aktif,non_aktif',
        ]);

        DB::transaction(function () use ($request, $asesi) {
            // Update user account
            $asesi->user->update([
                'name' => $request->nama_lengkap,
                'email' => $request->email,
            ]);

            // Update password if provided
            if ($request->filled('password')) {
                $asesi->user->update([
                    'password' => Hash::make($request->password)
                ]);
            }

            // Update asesi profile
            $asesi->update([
                'nim' => $request->nim,
                'nama_lengkap' => $request->nama_lengkap,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'jenis_kelamin' => $request->jenis_kelamin,
                'alamat' => $request->alamat,
                'no_telepon' => $request->no_telepon,
                'program_studi' => $request->program_studi,
                'semester' => $request->semester,
                'ipk' => $request->ipk,
                'instansi_asal' => $request->instansi_asal,
                'status' => $request->status,
            ]);
        });

        return redirect()->route('asesi.index')->with('success', 'Data asesi berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asesi $asesi)
    {
        DB::transaction(function () use ($asesi) {
            $asesi->user->delete(); // This will cascade delete the asesi record
        });

        return redirect()->route('asesi.index')->with('success', 'Data asesi berhasil dihapus');
    }
}
