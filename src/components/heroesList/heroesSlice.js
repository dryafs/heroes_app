import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter()

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})

export const getHeroes = createAsyncThunk(
    'heroes/getHeroes',
    async () => {
        const {request} = useHttp()
        return await request('http://localhost:3001/heroes')
    }
)


const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        deleteHero: (state, action) => {
            heroesAdapter.removeOne(state, action.payload)
        },
        addHero: (state, action) => {
            heroesAdapter.addOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHeroes.pending, (state) => {state.heroesLoadingStatus = 'loading'})
            .addCase(getHeroes.fulfilled, (state,action) => {state.heroesLoadingStatus = 'idle'; heroesAdapter.setAll(state, action.payload)})
            .addCase(getHeroes.rejected, (state) => {state.heroesLoadingStatus = 'error'})

    }
})

export const {actions, reducer} = heroesSlice;
export const {deleteHero, addHero} = actions;
export default reducer

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)
export const filteredHeroesSelector = createSelector(
    (state) => state.filter.currentFilter,
    selectAll,
    (filter, heroes) => {
        if(filter === 'all'){
            return heroes
        } else {
            return heroes.filter(item => item.element === filter)
        }
    }

)