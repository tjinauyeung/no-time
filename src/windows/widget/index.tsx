import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import Styles from '../../shared/styles/styles';

const Frame = styled.div`
  position: relative;
`;

const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border-radius: 100px;
  text-align: center;
  background: #ff3e54;
  font-weight: 500;
  border: none;
  color: #fff;
  padding: 12px 20px;
  font-size: 16px;
  font-family: "IBM Plex Sans", sans-serif;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;
  text-align: center;
`;

const Widget = () => {
  const openDashboard = () => {
    window.ipcRenderer.send("open-dashboard");
  };

  return (
    <Frame>
      <Styles />
      <Content>
        <Title>No Time</Title>
        <Button onClick={openDashboard}>Open dashboard</Button>
      </Content>
    </Frame>
  );
};

ReactDOM.render(<Widget />, document.getElementById("root"));
