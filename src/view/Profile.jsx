import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  return (
    <div>
      <div>
        <div>
          <img src={picture} alt="Profile" />
        </div>
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
      </div>
      <div>{JSON.stringify(user)}</div>
      <LogoutButton />
    </div>
  );
};

export default Profile;
