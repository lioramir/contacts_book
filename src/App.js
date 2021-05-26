import React, { useState } from 'react';
import TopBar from "./TopBar/TopBar";
import ContactsGrid from './ContactsGrid/ContactsGrid'

function App() {
  const [search, setSearch] = useState('');
  const [gender, setGender] = React.useState('All Genders');
  return (
    <div className="App">
      <TopBar setSearch={setSearch} gender={gender} setGender={setGender} />
      <ContactsGrid search={search} gender={gender}/>
    </div>
  );
}

export default App;
