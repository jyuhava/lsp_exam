<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            
            // Store in public/uploads directory
            $path = $file->storeAs('uploads', $filename, 'public');
            
            $url = Storage::url($path);
            
            return response()->json([
                'url' => $url,
                'success' => true
            ]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }

    // Alternative method for CKEditor compatibility
    public function uploadForCKEditor(Request $request)
    {
        $request->validate([
            'upload' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('upload')) {
            $file = $request->file('upload');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            
            // Store in public/uploads directory
            $path = $file->storeAs('uploads', $filename, 'public');
            
            $url = Storage::url($path);
            
            return response()->json([
                'url' => $url
            ]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
}
