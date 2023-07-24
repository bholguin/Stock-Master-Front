import { FC } from 'react';
import { Icon404 } from 'assets/404';
import { useNavigate } from 'react-router-dom';
import { Styled } from './styles';


export const Page404: FC = (props) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <Styled.Content>
      <Icon404 />
      <Styled.Information>
        <Styled.PageTitle>
          recurso no encontrado
        </Styled.PageTitle>
      </Styled.Information>
      <Styled.ButtonStyle
        variant="contained"
        onClick={goBack}
      >
        Ir Atras
      </Styled.ButtonStyle>
    </Styled.Content>
  );
};
