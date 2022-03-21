import {AppBar, Dialog, IconButton, Slide, Toolbar} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, {ReactNode} from 'react';
import {TransitionProps} from "@mui/material/transitions";
import {Text} from '../../../../lib/ui-components';
import {Attendant} from "../../../../core/domain/models/attendant";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AttendantModalProps {
    open: boolean;
    handleClose: () => void;
    isEdit?: boolean
    children: ReactNode;
}

export const AttendantModal = ({open, handleClose, isEdit = false, children}: AttendantModalProps) => {

    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Text sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            {AttendantTitle(isEdit, {} as Attendant)}
                        </Text>
                    </Toolbar>
                </AppBar>
                {children}
            </Dialog>

        </>
    );
}

const AttendantTitle = (isEdit: boolean, attendant: Attendant) => {
    if (isEdit) {
        return (<Text sx={{ml: 2, flex: 1}} variant="h6" component="div">
            {`Edit ${attendant.name}`}
        </Text>)
    } else {
        return (<Text sx={{ml: 2, flex: 1}} variant="h6" component="div">
            {`Add attendant`}
        </Text>)
    }
}
