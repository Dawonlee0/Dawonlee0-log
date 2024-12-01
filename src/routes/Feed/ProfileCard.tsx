import styled from "@emotion/styled"
import Image from "next/image"
import React from "react"
import { CONFIG } from "site.config"
import { Emoji } from "src/components/Emoji"

type Props = {}

const ProfileCard: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      <Section>
        <div className="title">
          <Emoji>💻</Emoji> Profile
        </div>
        <div className="content">
          <div className="top">
            <Image src={CONFIG.profile.image} fill alt="" />
          </div>
          <div className="mid">
            <div className="name">{CONFIG.profile.name}</div>
            <div className="role">{CONFIG.profile.role}</div>
            <div className="bio">{CONFIG.profile.bio}</div>
          </div>
        </div>
      </Section>
    </StyledWrapper>
  )
}

export default ProfileCard

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .title {
    padding: 0.25rem;
    font-size: 1rem;
    margin-top: 1.5rem;
  }
  
  .content {
    border-radius: 1rem;
    width: 100%;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    padding: 1rem;
  }

  &:first-of-type .title {
    margin-top: 0;
  }
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  .top {
    position: relative;
    width: 100%;
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }
  
  .mid {
    display: flex;
    padding: 0.5rem;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    .name {
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-style: italic;
      font-weight: 700;
    }
    
    .role {
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray11};
    }
    
    .bio {
      font-size: 0.875rem;
      line-height: 1.25rem;
      margin-bottom: 0.5rem;
    }
  }
`
