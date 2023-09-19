import React, { type FC } from 'react';

import { type IChat } from '../types';

type TProps = {
    chat: IChat
}

const ChatRow: FC<TProps> = ({ chat }) => {
    return (
        <div>
            <p>
                {chat.name}
            </p>
        </div>
    );
};

export default ChatRow;
