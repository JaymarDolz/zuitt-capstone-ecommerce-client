import React from 'react';

// UserContext contains shared data across components
const UserContext = React.createContext();

// UserProvider is a component that provides data to other components
export const UserProvider = UserContext.Provider;

export default UserContext;