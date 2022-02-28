import React, { useEffect, useState } from "react";
import useSession from './session_context';
import "./App.css";
import ftrackWidget from 'ftrack-web-widget'; // helper library for custom

function displayProjectInfo(id) {
  ftrackWidget.openSidebar('Project', id);
}

function App() {

  const [projects, setProjects] = useState([])
  const session = useSession();
  const entity = ftrackWidget.getEntity(); // get the entity here

  useEffect(() => {
    // Get all projects this user has access to
    session.query('select name from Project').then(response => {
      setProjects(response.data);
    }, [session]);
  });

  return (
    <div className="App">
      <header className="App-header">{session.apiUser}</header>
      <main>
        <ul>
          {projects.map((project) => (
            <li className={entity.id === project.id ? 'current-project' : null}
              onClick={() => {
                displayProjectInfo(project.id);
              }}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;