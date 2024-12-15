import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addHero } from "../heroesList/heroesSlice";
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {
    const {filters} = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const {request} = useHttp()
    const [hero, setHero] = useState({
        id: uuidv4(),
        name: '',
        description: '',
        element: ''
    });

    const onChange = (e) => {
        const {value, name} = e.target;
        setHero({
            ...hero,
            [name]: value
        });
    };

    const onSubmit = () => {
        dispatch(addHero(hero))
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(hero))
        setHero({
            id: '',
            name: '',
            description: '',
            element: ''
        });
    };

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={hero.name}
                    onChange={(e) => onChange(e)}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="text"
                    value={hero.description} 
                    placeholder="Что я умею?"
                    onChange={(e) => onChange(e)}
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={hero.element}
                    onChange={(e) => onChange(e)}>
                    <option >Я владею элементом...</option>
                    {
                        filters.map(item => {
                            if(item.name !== 'all'){
                                return <option key={item.name} value={item.name}>{item.label}</option>
                            }
                        })
                    }
                </select>
            </div>

            <button onClick={onSubmit} type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;