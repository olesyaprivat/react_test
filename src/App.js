

import { useEffect, useReducer } from "react";
import {ContextApp, initialState, notesReducer} from "./context/reducer";
import CreateForm from "./components/CreateForm";
import NotesList from "./components/NotesList";
import NoteBlock from "./components/NoteBlock";
function App() {

  const [state, dispatch] = useReducer(notesReducer, initialState);

  useEffect(()=> {
    document.querySelectorAll('a').length && document.querySelectorAll('a').forEach(el => {
      el.addEventListener('click', () => {
        alert('Do you really want to follow the link?')
      })
    })
  }, [state.notes, state.isActiveForm])

  return (
    <ContextApp.Provider value={{dispatch, state}}>
      <div className="d-flex w-100 p-3">
        <div className="w-50 pe-5">
          { state.isActiveForm ? <CreateForm/> : <NoteBlock/> }
        </div>
        <NotesList />
      </div>
    </ContextApp.Provider>
  );
}

export default App;
