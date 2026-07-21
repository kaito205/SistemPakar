<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $unreadCount = 0;
        $recentNotifications = [];

        if ($request->user()) {
            \Carbon\Carbon::setLocale('id');
            $unreadCount = \App\Models\Diagnosis::where('is_read', false)->count();
            $recentNotifications = \App\Models\Diagnosis::orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function ($log) {
                    return [
                        'id' => $log->id,
                        'name' => $log->nama,
                        'level' => $log->level_name,
                        'type' => $log->level_code,
                        'score' => (float)$log->score,
                        'time' => $log->created_at->diffForHumans(),
                        'is_read' => $log->is_read,
                    ];
                });
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'notifications' => [
                'unreadCount' => $unreadCount,
                'list' => $recentNotifications,
            ]
        ];
    }
}
