import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import ActionPanel from "./components/ActionPanel";
import StageArea from "./components/StageArea";
import { ContextProvider } from "./components/Context";
import Header from "./components/Header";

const App = () => {
  const [actions, setActions] = useState({});

  return (
    <DndProvider backend={HTML5Backend}>
      <ContextProvider>
        <div className="flex flex-col h-screen">
          <Header /> {/* Top Header */}
          
          {/* Main body section */}
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <ActionPanel actions={actions} setActions={setActions} />
            <StageArea actions={actions} setActions={setActions} />
          </div>
        </div>
      </ContextProvider>
    </DndProvider>
  );
};

export default App;
