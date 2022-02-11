import React from 'react';
import {Box, Text, Avatar} from '../../../lib/ui-components'


export const Header = () => {
    return (
        <header>
            <Box display='flex' width='100%' alignItems='center' justifyContent='space-between' paddingX={2}
                 paddingY={1}>
                <Text>Quidle</Text>
                <Avatar variant="circular" />
            </Box>
        </header>
    );
};
