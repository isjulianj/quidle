import React from 'react';
import {Box, Text, Avatar} from '../../../ui-components'
import {NavLink} from "react-router-dom";


export const Header = () => {

    return (
        <header>
            <Box  sx={{
                display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingX: 2,
                paddingY: 1, boxShadow: 3,
            }}>
                    <NavLink to='/'>
                        <Text>Quidle</Text>
                    </NavLink>
                    <Avatar variant="circular"/>

            </Box>
        </header>
    );
};
