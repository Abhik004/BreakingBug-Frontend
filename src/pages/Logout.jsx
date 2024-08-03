import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateCustomer } from '../redux/userHandle';
import styled from 'styled-components';

const Logout = () => {
  const { currentUser, currentRole } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentRole === "Customer" && currentUser) {
      dispatch(updateCustomer(currentUser));
    }
  }, [currentRole, currentUser, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser()); // Clear user state
    navigate('/'); // Redirect after logging out
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <LogoutContainer>
      <h1>{currentUser ? currentUser.name : "User"}</h1>
      <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
      <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
      <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
    </LogoutContainer>
  );
};

export default Logout;

const LogoutContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #8966c666;
  color: black;
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ea0606;
  &:hover {
    background-color: #770000;
  }
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #0505ba;
  &:hover {
    background-color: rgb(10, 2, 69);
  }
`;
