import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

export const getFilters = createAsyncThunk(
    'filter/getFilters',
    async () => {
        const {request} = useHttp()
        return await request('http://localhost:3001/filters')
    }
)


const initialState = {
    filters: [],
    currentFilter: 'all',
    filteredHeroes: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter: (state, action) => {
            state.currentFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFilters.fulfilled, (state, action) => {state.filters = action.payload})
    }
})

export const {actions, reducer} = filterSlice
export const {changeFilter} = actions
export default reducer