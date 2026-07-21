<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $team = TeamMember::orderBy('id')->get()->map(function ($member) {
            return [
                'id' => $member->id,
                'name' => $member->name,
                'role' => $member->role,
                'bio' => $member->bio,
                'initials' => $member->initials,
                'imagePath' => $member->image_path,
                'socials' => [
                    'instagram' => $member->instagram,
                    'github' => $member->github,
                    'linkedin' => $member->linkedin,
                ]
            ];
        });

        return Inertia::render('Admin/Tim', [
            'team' => $team
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'bio' => 'required|string',
            'initials' => 'required|string|max:10',
            'imagePath' => 'nullable|string|max:255',
            'instagram' => 'nullable|url|max:255',
            'github' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
        ]);

        TeamMember::create([
            'name' => $validated['name'],
            'role' => $validated['role'],
            'bio' => $validated['bio'],
            'initials' => $validated['initials'],
            'image_path' => $validated['imagePath'],
            'instagram' => $validated['instagram'],
            'github' => $validated['github'],
            'linkedin' => $validated['linkedin'],
        ]);

        return redirect()->back()->with('success', 'Anggota tim baru berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'bio' => 'required|string',
            'initials' => 'required|string|max:10',
            'imagePath' => 'nullable|string|max:255',
            'instagram' => 'nullable|url|max:255',
            'github' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
        ]);

        $member = TeamMember::findOrFail($id);

        $member->update([
            'name' => $validated['name'],
            'role' => $validated['role'],
            'bio' => $validated['bio'],
            'initials' => $validated['initials'],
            'image_path' => $validated['imagePath'],
            'instagram' => $validated['instagram'],
            'github' => $validated['github'],
            'linkedin' => $validated['linkedin'],
        ]);

        return redirect()->back()->with('success', 'Data anggota tim berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $member = TeamMember::findOrFail($id);
        $member->delete();

        return redirect()->back()->with('success', 'Anggota tim berhasil dihapus.');
    }
}
