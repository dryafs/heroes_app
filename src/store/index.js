import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../components/heroesList/heroesSlice'
import filterReducer from '../components/heroesFilters/filterSlice'

const store = configureStore({
    reducer: {
        heroes: heroesReducer,
        filter: filterReducer
    }
})

export default store;