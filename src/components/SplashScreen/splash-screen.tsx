import { FC } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import { usePromiseTracker } from 'react-promise-tracker';
import { Styled } from './styles';
import { theme } from 'config/theme'

export const SplashScreen: FC = (): JSX.Element => {
    const { promiseInProgress } = usePromiseTracker();
    return promiseInProgress ? (
        <Styled.Content>
            <CirclesWithBar color={theme.palette.primary.main} />
        </Styled.Content>
    ) : null;
};