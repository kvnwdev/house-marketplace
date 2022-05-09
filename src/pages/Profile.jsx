import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) setUser(auth.currentUser);
  }, []);

  return user ? <h1>{user.displayName}</h1> : 'Not logged in';
}
export default Profile;
