import Card from "../Components/Card";
import React from "react";

function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, onRemoveToCart, notify}) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1 className="">{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block">
                    <img src="/img/search.svg" alt="Search"/>
                    {searchValue &&
                        <img className="clear cu-p" src="/img/btn-remove.svg" onClick={() => setSearchValue('')}
                             alt="Clear"/>}
                    <input type="text" placeholder="Поиск..." value={searchValue} onChange={onChangeSearchInput}/>
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {
                    items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((val, index) => (
                        <Card
                            key={index}
                            onFavorite={onAddToFavorite}
                            onPlus={(obj, status) => {
                                if (status) {
                                    onAddToCart(obj);
                                } else {
                                    onRemoveToCart(obj);
                                }
                            }}
                            notify={(text, status) => notify(text, status)}
                            {...val}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Home;