import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-screen max-h-fit flex flex-col align-middle items-center justify-center">
            {children}
        </div>
    )
}

export default AuthLayout