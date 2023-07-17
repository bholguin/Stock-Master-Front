import { FC } from "react"
import { Styled } from "./styles"
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

export const TableActions: FC = () => {
    return (
        <Styled.Content>
            <Styled.ButtonStyled variant="contained">
                <EditNoteIcon />
            </Styled.ButtonStyled>
            <Styled.ButtonStyled variant="contained">
                <DeleteIcon />
            </Styled.ButtonStyled>
        </Styled.Content>
    )
}