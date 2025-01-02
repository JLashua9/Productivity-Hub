import React from 'react';
import './Card.css';

interface CardProps {
    title: string;
    image: string;
}

export const Card: React.FC<CardProps> = ({ title, image }) => {
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <div className="card-title">{title}</div>
        </div>
    );
};