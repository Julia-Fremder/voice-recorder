import React, { MouseEventHandler } from 'react'

interface Props {
    border?: string;
    color: string;
    children?: React.ReactNode;
    height?: string;
    onClick: MouseEventHandler | (() => void);
    radius: string
    width: string;
    disabled: boolean;
  }
  
  const Button: React.FC<Props> = ({ 
      border,
      color,
      children,
      height,
      onClick, 
      radius,
      width,
      disabled
    }) => { 
    return (
      <button 
        onClick={onClick}
        disabled={disabled}
        style={{
           backgroundColor: color,
           border,
           borderRadius: radius,
           height,
           width
        }}
      >
      {children}
      </button>
    );
  }
  
  export default Button;