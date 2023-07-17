export interface IPaginationStore{
    handleChangePage: (newPage: number) => void;
    handleChangeRowsPerPage: (rows: number) => void;
    configPagination: (totalElements: number) => void;
    dispose: () => Promise<void>
    readonly page: number;
    readonly rowsPerPage: number;
    readonly totalPages: number;
    readonly sizeList: Array<number>
}
