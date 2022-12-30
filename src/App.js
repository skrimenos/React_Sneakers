import React, {useContext, useEffect} from "react";
import axios, {Axios} from "axios";
import Card from "./Components/Card";
import Header from "./Components/Header";
import Drawer from "./Components/Drawer";
import Home from "./Pages/Home";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from "react-router-dom";
import Favorites from "./Pages/Favorites";

function App() {
    const notify = (text, status) => {
        if (status) {
            toast.success(text, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error(text, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    };

    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    const [favorites, setFavorites] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://63a9d531594f75dc1dc1c114.mockapi.io/items').then(res => {
            setItems(res.data);
        })
        axios.get('https://63a9d531594f75dc1dc1c114.mockapi.io/cart').then(res => {
            setCartItems(res.data);
        })
        axios.get('https://63a9d531594f75dc1dc1c114.mockapi.io/favorite').then(res => {
            setFavorites(res.data);
        });
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://63a9d531594f75dc1dc1c114.mockapi.io/cart', obj).then(res => {
            setCartItems(prev => [...prev, obj]);
        })
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(element => element.id === obj.id && obj.id !== undefined)) {
                axios.delete('https://63a9d531594f75dc1dc1c114.mockapi.io/favorite/' + obj.id);
                setFavorites((prev) => prev.filter((item) => {
                    console.log(item);
                    console.log(obj);
                    return item.id !== obj.id;
                }));
            } else {
                const {data} = await axios.post('https://63a9d531594f75dc1dc1c114.mockapi.io/favorite', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            console.log('Не удалось добавить в фавориты: ' + error);
        }
    }

    const onRemoveToCart = (obj) => {
        axios.delete('https://63a9d531594f75dc1dc1c114.mockapi.io/cart/' + obj.id).then(res => {
            setCartItems(current => current.filter(sneaker => {
                return sneaker.price !== obj.price && sneaker.title !== obj.title && sneaker.imageUrl !== obj.imageUrl
            }),);
            notify(false, 'Товар Удалён Из Корзины!');
        })
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer key={'Drawer'} onClose={() => setCartOpened(false)} items={cartItems}
                                   onRemoveClick={(obj) => obj && onRemoveToCart(obj)}/>}
            <Header onClickCart={() => {
                setCartOpened(true);
                axios.get('https://63a9d531594f75dc1dc1c114.mockapi.io/cart').then(res => {
                    setCartItems(res.data);
                })
            }}/>

            <Routes>
                <Route path="/" element={<Home items={items}
                                               searchValue={searchValue}
                                               setSearchValue={setSearchValue}
                                               onChangeSearchInput={onChangeSearchInput}
                                               onAddToFavorite={onAddToFavorite}
                                               onAddToCart={onAddToCart}
                                               onRemoveToCart={onRemoveToCart}
                                               notify={notify}/>}/>
                <Route path="/favorites" element={<Favorites items={favorites} onFavorite={onAddToFavorite}/>}/>
            </Routes>


            <ToastContainer/>
        </div>);
}

export default App;
