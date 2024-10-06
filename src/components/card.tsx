import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ title, children }) => {
  return (
    <div
      className="card"
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        flex: 1,
      }}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Card;
