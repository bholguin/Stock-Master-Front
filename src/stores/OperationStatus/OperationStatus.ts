import {AxiosError} from 'axios';

/* eslint-disable no-unused-vars */
export enum OperationStatus {
    Idle = 'Idle',
    Running = 'Running',
    Done = 'Done',
    Paused = 'Paused',
    Aborted = 'Aborted',
    Failed = 'Failed',
}

export type FailedParams = {
    current: boolean;
    error: AxiosError
}
