export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-transparent bg-teal-600 text-xs font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-teal-700 focus:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 active:bg-teal-800 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400 dark:focus:bg-teal-400 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
