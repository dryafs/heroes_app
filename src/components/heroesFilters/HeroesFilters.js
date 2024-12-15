import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFilters, changeFilter } from "./filterSlice";
import { filterHeroes } from "../heroesList/heroesSlice";

const HeroesFilters = () => {
    const {heroes} = useSelector(state => state.heroes)
    const {filters, currentFilter} = useSelector(state => state.filter)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilters())
    }, [dispatch])

    useEffect(() => {
        dispatch(filterHeroes(currentFilter))
    }, [currentFilter, heroes, dispatch])

    const onChangeFilter = (name) => {
        dispatch(changeFilter(name))
    }

    const renderFilters = (arr) => {
        return arr.map(item => {
            return <button key={item.name} onClick={() => onChangeFilter(item.name)} className={currentFilter === item.name ? `${item.className} active` : item.className}>{item.label}</button>
        })
    }

    const elements = renderFilters(filters)
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;