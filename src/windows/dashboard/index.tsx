import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import Styles from "../../shared/styles/styles";
import { Settings, PlusCircle } from "../../shared/icons";
import { IpcRenderer } from "electron";
import Activities from "./activities";
import { Processes } from "../../shared/types/interfaces";

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }
}

const Frame = styled.div`
  padding: 80px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 16px;
  display: flex;
`;

const Process = styled.p`
  display: flex;
  justify-content: space-between;
  line-height: 18px;
`;

const Tabs = styled.div`
  position: fixed;
  bottom: 40px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

const Tab = styled.button<{ side: string; active: boolean }>`
  padding: 10px 50px;
  color: ${(props) => (props.active ? "#fff" : "#ddd")};
  border: none;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  transition: all 100ms ease;

  &:hover {
    color: #fff;
  }
  background: ${(props) => (props.active ? "#ff3e54" : "#90313e")};

  ${(props) => `
    border-top-${props.side}-radius: 50px;
    border-bottom-${props.side}-radius: 50px;
  `}

  &:focus {
    outline: none;
  }
`;

const SettingsMenu = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const SelectAll = styled.button`
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-family: "IBM Plex Sans", sans-serif;
  background: none;
  margin-left: 12px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Projects = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const ProjectCard = styled.div`
  background: #25292d;
  border-radius: 8px;
  padding: 24px;
  overflow: hidden;
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  background: #ff3e54;
  display: grid;
  border-radius: 100%;
  place-items: center;
  font-size: 10px;
  font-weight: 600;
  margin-right: 18px;
`;

const ProjectBar = styled.div`
  margin: 48px -24px -24px;
  background: #2a2e32;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #646668;
`;

const ProjectTime = styled.span`
  font-size: 28px;
  font-weight: 300;
  line-height: 28px;
  position: relative;
`;

const ProjectActions = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonOutline = styled.button`
  border-radius: 100px;
  padding: 6px 12px;
  font-family: "IBM Plex Sans", sans-serif;
  border: 1px solid #646668;
  color: #646668;
  background: none;
  font-weight: 300;
  margin-left: 6px;
`;

const ProjectLabel = styled.label`
  position: absolute;
  top: calc(-100% - 16px);
  left: 0;
  font-weight: 500;
  font-size: 14px;
`;

const ProjectCreate = styled.button`
  border-radius: 100px;
  background: #fff;
  color: #ff3e54;
  font-size: 14px;
  font-family: "IBM Plex Sans", sans-serif;
  padding: 10px 18px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  align-items: center;
  z-index: 1;

  svg {
    height: 20px;
    width: 20px;
  }
`;

const Dashboard = () => {
  const [processes, setProcesses] = React.useState<Processes>({});
  const [tab, setTab] = React.useState("projects");

  React.useEffect(() => {
    window.ipcRenderer.on("update-processes", (e, message) => {
      setProcesses(message);
    });
  }, []);

  const formatTime = (time: number) =>
    new Date(time * 1000).toISOString().substr(11, 8);

  return (
    <Frame>
      <Styles />
      <SettingsMenu>
        <Settings />
      </SettingsMenu>
      {tab === "activity" ? (
        <Activities processes={processes} />
      ) : (
        <Projects>
          <Project />
          <Project />
          <Project />
          <ProjectCreate>
            <span style={{ marginRight: 12 }}>Create project</span>
            <PlusCircle />
          </ProjectCreate>
        </Projects>
      )}
      <Tabs>
        <Tab
          side="left"
          active={tab === "activity"}
          onClick={(e) => setTab("activity")}
        >
          Activity
        </Tab>
        <Tab
          side="right"
          active={tab === "projects"}
          onClick={(e) => setTab("projects")}
        >
          Projects
        </Tab>
      </Tabs>
    </Frame>
  );
};

const Project = () => (
  <ProjectCard>
    <Title>
      <Avatar>MP</Avatar>
      My Project name
    </Title>
    <ProjectBar>
      <ProjectTime>
        <ProjectLabel>Today</ProjectLabel>
        02:23:14
      </ProjectTime>
      <ProjectTime>
        <ProjectLabel>Total</ProjectLabel>
        02:23:14
      </ProjectTime>
      <ProjectActions>
        <ButtonOutline>Export</ButtonOutline>
        <ButtonOutline>Open</ButtonOutline>
      </ProjectActions>
    </ProjectBar>
  </ProjectCard>
);

ReactDOM.render(<Dashboard />, document.getElementById("root"));
