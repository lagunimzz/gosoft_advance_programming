import axios from 'axios';
import { useState } from 'react';
import { Profile } from './Profile';
function App() {
  const [profileList, setProfileList] = useState([]);
  const fetchProfile = async () => {
    const profile = await axios.get('https://randomuser.me/api/');
    const { picture, login, email, gender, name } = profile.data.results[0];
    return setProfileList([
      ...profileList,
      {
        picture: picture.large,
        id: login.uuid,
        email,
        gender,
        name: `${name.title} ${name.first} ${name.last}`,
      },
    ]);
  };
  return (
    <div>
      {profileList.length > 0 &&
        profileList.map((profile) => <Profile key={profile.id} {...profile} />)}
      <button onClick={() => fetchProfile()}>Generate User</button>
    </div>
  );
}

export default App;
