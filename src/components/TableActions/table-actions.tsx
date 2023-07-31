import { FC } from "react"
import { Styled } from "./styles"
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    update?: (data: any) => void
    remove?: (data: any) => void
}

export const TableActions: FC<Props> = (props) => {
    const {
        remove,
        update
    } = props
    return (
        <Styled.Content>
            {update &&
                <Styled.ButtonStyled
                    variant="contained"
                    onClick={update}
                >
                    <EditNoteIcon />
                </Styled.ButtonStyled>
            }
            {remove &&
                <Styled.ButtonRemoveStyled
                    variant="contained"
                    onClick={remove}
                >
                    <DeleteIcon />
                </Styled.ButtonRemoveStyled>
            }
        </Styled.Content>
    )
}