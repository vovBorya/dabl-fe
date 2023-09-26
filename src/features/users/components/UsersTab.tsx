import React, { type FC, useMemo } from 'react';

import { useGetUsersQuery } from '../usersAPI';
import UserRow from './UserRow';

const UsersTab: FC = () => {
    const { data: users } = useGetUsersQuery();

    const memoizedUsers = useMemo(() => (users || []).map(user => (
        <UserRow
            key={user.id}
            user={user} />
    )),[ users ]);

    return (
        <div>
            {memoizedUsers}
        </div>
    );
};

export default UsersTab;
