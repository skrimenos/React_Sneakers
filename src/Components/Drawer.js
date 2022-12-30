import React, {Component} from 'react';

class Drawer extends Component {
    render() {
        let price = 0;
        return (
            <div className="overlay">
                <div className="drawer">
                    <h2 className="mb-30 d-flex justify-between">Корзина <img onClick={this.props.onClose}
                                                                              className="removeBtn cu-p"
                                                                              src="/img/btn-remove.svg" alt="Close"/>
                    </h2>

                    {this.props.items.length > 0 ? (
                        <>
                            <div className="items">
                                {this.props.items.map((obj) => (
                                    <div className="cartItem d-flex align-center mb-20">
                                        <div className="cartItemImg"
                                             style={{backgroundImage: `url(${obj.imageUrl})`}}></div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img className="removeBtn" src="/img/btn-remove.svg"
                                             onClick={() => {
                                                 this.props.onRemoveClick(obj)
                                             }} alt="Remove"/>
                                    </div>
                                ))}
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li className="d-flex">
                                        <span>Итого: </span>
                                        <div></div>
                                        {this.props.items.map(item => {
                                            price += item.price;
                                        })}
                                        <b>{price} руб.</b>
                                    </li>
                                    <li className="d-flex">
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{`${(price * 0.05).toFixed(2)}`} руб.</b>
                                    </li>
                                </ul>
                                <button className="greenButton">Оформить заказ <img src="/img/arrow.svg"
                                                                                    alt="Arrow"></img>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                            <img className="mb-20" src="/img/empty-cart.jpg" height={120} alt="EmptyCart"/>
                            <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                            <button className="greenButton" onClick={this.props.onClose}>
                                <img src="/img/arrow.svg" alt="Arrow"/>Вернуться назад
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Drawer;