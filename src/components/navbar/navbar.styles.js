import styled from "styled-components";

export const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;
export const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 24px;
  color: ${({ theme }) => theme.text};
`;

export const Input = styled.input`
  width: 95%;
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

export const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  position: relative;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  margin-left: 8px;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  width: 136px;
  padding: 16px;
  position: absolute;
  top: 50px;
  right: 4px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bgLighter};
`;

export const DropdownItem = styled.div`
  margin: 16px 0;
  padding: 12px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
