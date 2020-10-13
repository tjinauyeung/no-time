import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 16px;
  display: flex;
`;

export const SelectAll = styled.button`
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

export const ProcessSelect = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  margin-top: 12px;
`;

export const Selection = styled.div`
  background: rgba(39, 43, 47, 0.8);
  border-radius: 8px;
  padding: 24px;
`;


export const ChildSelect = styled.div`
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 18px;
  color: #646668;
  margin-top: 6px;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 12px;
`;
