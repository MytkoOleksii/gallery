import React, {useEffect, useState} from 'react';
import './index.scss';
import {Collection} from "./Collection";

const category = [
    {'name': "all"},     // 0
    {'name': "animals"}, // 1
    {'name': 'builds'},  // 2
    {'name': 'flowers'}, // 3
]

function App() {

    const [categoryId, setCategoryId] = useState(0)
    const [collections, setCollections] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1) // пагінатор
    console.log(collections)
    useEffect(() => {
        setLoading(true) // Призагрузке віводить loading
        let category2 = categoryId ? `category=${categoryId}` : '';
        fetch(`https://64e623c209e64530d17fa6ef.mockapi.io/api/id/protos?page=${page}&limit=3&${category2}`)
            .then((res) => res.json())
            .then((json) => {
                setCollections(json)
            })
            .catch((err) => { console.warn(err);
            alert('Mistake get data');
            })
            .finally( () => setLoading(false))// по окончанию загрузки убирать loading

    }, [categoryId, page])
    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    фільтр по категоріям:
                    {category.map((obj,index) => // передаем индекс масива категорий
                    <li key={obj.name} onClick={()=> setCategoryId(index)} className={categoryId === index ? "active" : ''}>{obj.name}</li>
                    )}
                </ul>
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию"/>
            </div>
            <div className="content">
                {loading ? (<h2>Loading...</h2>) : (
                collections.filter(obj => { // сначада фильтр, если в обекте имя (в нижнем регистре) хоть шонибуть совпадае с введеным в поиск тогда мап
                    return obj.name.toLowerCase().includes(searchValue.toLowerCase())})
                    .map((obj) => (
                    <Collection key={obj.id}
                        name={obj.name}
                        images={obj.image}
                    />))
                )}

            </div>
            <ul className="pagination">
                пагінація:
                {[...Array(5)].map( (_, index) => (
                    <li onClick={() => setPage(index + 1)} className={page === index + 1 ? "active" : ''}>{index + 1 }</li>
                ))}
            </ul>
        </div>
    );
}

export default App;























