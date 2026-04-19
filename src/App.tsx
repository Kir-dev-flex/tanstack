import { UserList } from './components/UserList'
// import { InfiniteUsersList } from './components/InfiniteUsersList';
import { GlobalLoader } from './components/GlobalLoader';

import './App.css'

function App() {

  return (
    <>
    <GlobalLoader />
    {/* Все задания ДО бесконченой загрузки тут -> */} <UserList /> 
      {/* <InfiniteUsersList />  */}
    </>
  )
}

export default App
