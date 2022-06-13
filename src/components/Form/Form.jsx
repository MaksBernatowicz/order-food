import React, { useState } from "react";
import './styles/Form.css'

const API_URL = 'https://frosty-wood-6558.getsandbox.com:443';

const Form = () => {

    const [itemName, setItemName] = useState('');
    const [itemTime, setItemTime] = useState('');
    const [dishType, setDishType] = useState('dishType');
    const [pizzaDiameter, setPizzaDiameter] = useState('');
    const [pizzaNoSlices, setPizzaNoSlices] = useState('');
    const [soupSpiciness, setSoupSpiciness] = useState(1);
    const [breadNoSlices, setBreadNoSlices] = useState('');

    const [error, setError] = useState(null);

    const orderSubmit = (event) => {
        event.preventDefault();

        var order = {
            name: itemName,
            preparation_time: itemTime,
            type: dishType,
        };

        if (dishType === 'pizza') {
            order = { ...order, no_of_slices: parseFloat(pizzaNoSlices), diameter: parseFloat(pizzaDiameter) }
        } else if (dishType === 'soup') {
            order = { ...order, spiciness_scale: soupSpiciness }
        } else if (dishType === 'sandwich') {
            order = { ...order, slices_of_bread: parseFloat(breadNoSlices) }
        }

        fetch(`${API_URL}/dishes`, {
            method: 'POST',
            body: JSON.stringify(
                order
            ),
            headers: {
                "Content-type": "application/json",
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json();
                } else {
                    setError(null);
                }
            })
            .then(data => setError(data))
            .catch(err => { console.log(err) })
    }

    return (
        <form onSubmit={orderSubmit}>
            <div className='form__list'>
                <input
                    value={itemName}
                    onChange={(event) => setItemName(event.target.value)}
                    type='text'
                    className='form__item'
                    name='dishName'
                    placeholder='dish name'
                    required={true}
                />
                <input
                    value={itemTime}
                    onChange={(event) => setItemTime(event.target.value)}
                    type='text'
                    className='form__item'
                    name='preparationTime'
                    step='1'
                    onFocus={(event) => event.target.type = 'time'}
                    placeholder='preparation time'
                    required={true}
                />
                <select
                    value={dishType}
                    className='form__item'
                    name='dishType'
                    onChange={(event) => setDishType(event.target.value)}
                    required={true}

                >
                    <option value='dishType' disabled hidden>dish type</option>
                    <option value='pizza'>pizza</option>
                    <option value='soup'>soup</option>
                    <option value='sandwich'>sandwich</option>
                </select>
                {dishType === 'pizza' &&
                    <>
                        <input
                            value={pizzaDiameter}
                            className='form__item'
                            type='text'
                            inputMode='numeric'
                            placeholder='diameter'
                            onChange={(event) => setPizzaDiameter(event.target.value)}
                            required={true}
                        />
                        <input
                            value={pizzaNoSlices}
                            className='form__item'
                            type='text'
                            inputMode='numeric'
                            pattern='\d*'
                            placeholder='number of slices'
                            onChange={(event) => setPizzaNoSlices(event.target.value)}
                            required={true}
                        />
                    </>
                }
                {dishType === 'soup' &&
                    <>
                        <input
                            type='range'
                            name='spiciness'
                            min='1'
                            max='10'
                            value={soupSpiciness}
                            onChange={(event) => setSoupSpiciness(event.target.value)}
                            step='1'
                            required={true}
                        />
                        <label htmlFor='spiciness' style={{
                            color: 'var(--color-green-tertriary)',
                            backgroundColor: 'var(--color-green-primary)',
                            fontSize: '0.8rem',
                            borderTop: '1rem solid var(--color-green-primary)',
                            borderBottom: '1rem solid var(--color-green-primary)'
                        }}>spiciness</label>
                    </>
                }
                {dishType === 'sandwich' &&
                    <input
                        value={breadNoSlices}
                        className='form__item'
                        type='text'
                        inputMode='numeric'
                        pattern='\d*'
                        placeholder='number of slices'
                        onChange={(event) => setBreadNoSlices(event.target.value)}
                        required={true}
                    />
                }
            </div>
            <button className="submit__order">order</button>
            {error && <div>{JSON.stringify(error)}</div>}
        </form >
    );
};

export { Form };