import React, {useState} from 'react';

export const LoginScreen = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    return (
        <div>
            <input type="text"/>
            <input type="password"/>

            <button>
                sign in
            </button>
        </div>
    );
};
