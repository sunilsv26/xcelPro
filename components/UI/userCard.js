/* eslint-disable @next/next/no-img-element */
import React from "react";

const userCard = (props) => {
  return (
    <div className="card">
      <div className="card-icons">
        <div className="icon">
          <img src="/icons/vertical-dots.png" alt="icon" />
        </div>
        <div className="icon">
          <img src="/icons/star.png" alt="icon" />
        </div>
      </div>
      <div className="user-image">
        <img src={props.image} alt="User photo" />
      </div>
      <div className="user-name">
        <div className="name">{props.name}</div>
        <div className="last-name">{props.lastName}</div>
      </div>
      <div className="email">
        <div className="email-icon">
          <img src="/icons/mail.png" alt="email" />
        </div>
        <div>{props.email}</div>
      </div>
      <div className="email">
        <div className="email-icon">
          <img src="/icons/phone.png" alt="phone" />
        </div>
        <div>{props.phone}</div>
      </div>
    </div>
  );
};

export default userCard;
