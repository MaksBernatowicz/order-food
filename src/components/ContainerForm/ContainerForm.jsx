import React from 'react';
import './styles/ContainerForm.css';
import { Form } from '../Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const ContainerForm = () => {
    return (
        <div className='containerForm'>
            <h1 className='form__title'>order your food <FontAwesomeIcon icon={faUtensils} /></h1>
            <p className='signature'>by Maks Bernatowicz</p>
            <Form />
        </div>
    );
};

export { ContainerForm }