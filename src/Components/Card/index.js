import React from "react";
import styles from './Card.module.scss';

function Index({id,title, price, imageUrl, onFavorite, onPlus, notify,favorited=true}) {

    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        setIsAdded(!isAdded);

        let notifyMessage = 'Товар Удалён';
        let status = false;
        if (!isAdded) {
            notifyMessage = 'Товар Добавлен';
            status = true;
        }
        notify(notifyMessage, status);
        onPlus({title, price, imageUrl},status);
    }

    const onClickFavorite = (obj)=>{
        setIsFavorite(!isFavorite);
        onFavorite(obj);
    }

    React.useEffect(() => {
    }, [isAdded])

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={()=>onClickFavorite({id,title, price, imageUrl})}>
                <img src={isFavorite?"/img/unliked.svg":"/img/liked.svg"} alt=""/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus}
                     src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus"/>
            </div>
        </div>
    );
}

export default Index;