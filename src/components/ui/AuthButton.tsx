interface AuthButtonProps {
    children?: React.ReactNode;
}

export default function AuthButton({ children }: AuthButtonProps) {
    return (
        <button className="bg-blue-500 text-white py-2 px-4 mt-10 w-md rounded-xl text-xl">
            {children}
        </button>
    );
}
