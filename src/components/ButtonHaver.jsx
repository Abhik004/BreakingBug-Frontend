//new component
import React from 'react';
import { Button } from '@mui/material';

const ButtonHaver = ({ row }) => {
  const handleClick = () => {
    console.log('Button clicked', row);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Action
    </Button>
  );
};

export default ButtonHaver;
