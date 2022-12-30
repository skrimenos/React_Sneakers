import Card from "../Components/Card";
import React from "react";

function Favorites({items,onFavorite}) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои Закладки</h1>
            </div>
            <div className="d-flex flex-wrap">
                {
                    items.map((item,index)=>(
                        <Card
                            key={index}
                            favorited={false}
                            onFavorite={onFavorite}
                            {...item}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Favorites;