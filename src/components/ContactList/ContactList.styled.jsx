import styled from '@emotion/styled';

export const TotalContactsText = styled.p`
  font-size: 18px;
`;

export const TotalContactsNum = styled.span`
  margin-left: 4px;
  color: blue;
`;

export const PhonebookList = styled.ul`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  border: 1px solid darkgray;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 2px 10px -3px;
`;

export const ListElement = styled.li`
  :first-of-type {
    padding-top: 20px;
  }

  :last-child {
    padding-bottom: 20px;
  }

  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const NoMatchesText = styled.p`
  margin: 20px 0;
  font-size: 18px;
`;

export const NoContactsText = styled.p`
  font-size: 18px;
`;
