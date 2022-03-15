import React, {ReactNode} from 'react';
import {Box, Text} from "../../../../lib/ui-components";

interface MeetingHeaderProps {
    heading:string | undefined;
    children: ReactNode;
}

function MeetingHeader({heading, children} :MeetingHeaderProps) {
    return (
        <Box display='flex' justifyContent={"space-between"}>
            <Text margin='dense' variant='h5' component='h1'>{heading}</Text>
            {children}
        </Box>
    );
}

export default React.memo(MeetingHeader)
