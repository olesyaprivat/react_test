

import { useReducer } from "react";
import {initialState, notesReducer} from "./context/reducer";
import CreateForm from "./components/CreateForm";
import NotesList from "./components/NotesList";
import NoteBlock from "./components/NoteBlock";
import { NoteListContext } from './context/context';
import {useListState} from "./context/context.js";

const NotesListView = () => {
  const [state] = useListState();
  return (
      <div className="d-flex w-100 p-3">
        <div className="w-50 pe-5">
        { state.isActiveForm ? <CreateForm/> : <NoteBlock/> }
        </div>
        <NotesList  />
      </div>
  );
};

export const NoteListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  return <NoteListContext.Provider value={[state, dispatch]}>{children}</NoteListContext.Provider>;
};

function App() {
  return (
    <NoteListProvider>
      <NotesListView/>
    </NoteListProvider>
  );
}

export default App;
