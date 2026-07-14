import AppLayout from '@/Layouts/admin/AppLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AppLayout>
            <Head title="Profile" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Pengaturan Profil</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Perbarui informasi akun administrator, kata sandi, dan pengelolaan keamanan.
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 shadow-sm border border-slate-200 dark:border-slate-850 sm:rounded-2xl sm:p-8 dark:bg-slate-900/50">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-white p-6 shadow-sm border border-slate-200 dark:border-slate-850 sm:rounded-2xl sm:p-8 dark:bg-slate-900/50">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="bg-white p-6 shadow-sm border border-slate-200 dark:border-slate-850 sm:rounded-2xl sm:p-8 dark:bg-slate-900/50">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AppLayout>
    );
}
