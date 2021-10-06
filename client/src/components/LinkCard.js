import React from "react";

export const LinkCard = ({ link }) => {
    return (
        <div>
        <h2> Link </h2>
        <p>Your link: <a href={link.to} target="_blank" rel="noopener noreffer">{link.to}</a></p>
        <p>Where: <a href={link.from} target="_blank" rel="noopener noreffer">{link.from}</a></p>
        <p>Quantity of clicks: <strong>{link.clicks}</strong></p>
        <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    )
};
