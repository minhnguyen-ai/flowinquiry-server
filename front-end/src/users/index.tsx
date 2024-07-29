import React from 'react';
import { Datagrid, TextField, DateField, ShowButton, ShowGuesser, List, ListProps } from 'react-admin';
import UserIcon from '@material-ui/icons/People';

export const UserList: React.FC<ListProps> = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="email" />
                <DateField source="created_at" />
                <ShowButton />
            </Datagrid>
        </List>
    );
};

export default {
    icon: UserIcon,
    list: UserList,
    options: { label: 'Users' },
    show: ShowGuesser,
};