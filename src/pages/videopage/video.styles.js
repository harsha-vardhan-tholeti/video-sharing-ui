import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 24px;
`;

export const Content = styled.div`
  flex: 5;
`;

export const VideoWrapper = styled.div``;

export const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

export const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

export const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

export const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: gray;
`;

export const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

export const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

export const ChannelName = styled.span`
  font-weight: 500;
`;

export const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

export const Description = styled.p`
  font-size: 14px;
`;

export const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
