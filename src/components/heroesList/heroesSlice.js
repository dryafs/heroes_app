import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

export const getHeroes = createAsyncThunk(
    'heroes/getHeroes',
    async () => {
        const {request} = useHttp()
        return await request('http://localhost:3001/heroes')
    }
)

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filteredHeroes: []
}


const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        filterHeroes: (state, action) => {
            if(action.payload === 'all'){
                state.filteredHeroes = state.heroes
            } else {
                state.filteredHeroes = state.heroes.filter(item => item.element === action.payload)
            }
        
        },
        deleteHero: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        },
        addHero: (state, action) => {
            state.heroes.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHeroes.pending, (state) => {state.heroesLoadingStatus = 'loading'})
            .addCase(getHeroes.fulfilled, (state,action) => {state.heroesLoadingStatus = 'idle'; state.heroes = action.payload; state.filteredHeroes = action.payload})
            .addCase(getHeroes.rejected, (state) => {state.heroesLoadingStatus = 'error'})

    }
})

export const {actions, reducer} = heroesSlice;
export const {deleteHero, filterHeroes, addHero} = actions;
export default reducer