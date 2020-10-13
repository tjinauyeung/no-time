import * as React from "react";
import {
  Title,
  SelectAll,
  ProcessSelect,
  Selection,
  ChildSelect,
  Checkbox,
} from "./styled";
import { Processes } from "../../../shared/types/interfaces";

const Activities = ({ processes }: { processes: Processes }) => {
  const formatTime = (time: number) =>
    new Date(time * 1000).toISOString().substr(11, 8);

  return (
    <React.Fragment>
      <Title>
        <span>Current session</span>
        <SelectAll>Select all</SelectAll>
      </Title>
      <Selection>
        {Object.entries(processes).map(([name, process]) => (
          <div>
            <ProcessSelect>
              <label>
                <Checkbox />
                {name}
              </label>
              <span>{formatTime(process.time)}</span>
            </ProcessSelect>
            {Object.entries(process.views).map(([childName, time]) => (
              <ChildSelect key={childName}>
                <label>
                  <Checkbox />
                  {childName}
                </label>
                <span>{formatTime(time)}</span>
              </ChildSelect>
            ))}
          </div>
        ))}
      </Selection>
    </React.Fragment>
  );
};

export default Activities;
