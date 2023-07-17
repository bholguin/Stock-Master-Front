import { BackendPaginationStore } from "stores/BackendPagination";


export interface IPaginationTableStore{
    onChangePage: (e, page: number) => void;
    onChangePageSize: (size: number) => void;
    pagination: BackendPaginationStore;
}
