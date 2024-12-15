import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroes, deleteHero } from './heroesSlice';
import { useHttp } from '../../hooks/http.hook';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroesLoadingStatus, filteredHeroes} = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const {request} = useHttp()


    useEffect(() => {
        dispatch(getHeroes())
    }, [dispatch])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onDelete = (id) => {
        dispatch(deleteHero(id))
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)}/>
        })
    }

    console.log(filteredHeroes)
    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;