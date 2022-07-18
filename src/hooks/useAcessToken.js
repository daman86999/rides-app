import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function useAccessToken() {
  const [idToken, setIdToken] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const getAccessToken = async () => {
      const audience = process.env.REACT_APP_AUTO0_AUDIENCE;
      const scope = 'openid profile email';
      try {
        const accessToken = await getAccessTokenSilently({
          audience,
          scope,
        });
        setIdToken(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };

    getAccessToken();
  }, [getAccessTokenSilently, user?.sub]);

  return idToken;
}

export default useAccessToken;
