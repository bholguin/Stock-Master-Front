import { FC } from "react"
import { Styled } from "./styles"
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

type Props = {
    update?: (data: any) => void
    remove?: (data: any) => void
    view?: (data: any) => void
}

export const TableActions: FC<Props> = (props) => {
    const {
        remove,
        update,
        view
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
            {view &&
                <Styled.ButtonStyled
                    variant="contained"
                    onClick={view}
                >
                    <VisibilityIcon />
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