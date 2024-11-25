import { useState } from "react"
import Image from "next/image"
import SearchInput from "./SearchInput"
import { FeedHeader } from "./FeedHeader"
import Footer from "./Footer"
import styled from "@emotion/styled"
import TagList from "./TagList"
import MobileProfileCard from "./MobileProfileCard"
import ProfileCard from "./ProfileCard"
import ServiceCard from "./ServiceCard"
import ContactCard from "./ContactCard"
import PostList from "./PostList"
import PinnedPosts from "./PostList/PinnedPosts"
import { css } from "@emotion/react"

const HEADER_HEIGHT = 73

type Props = {}

const Feed: React.FC<Props> = () => {
  const [q, setQ] = useState("")

  return (
    <>
      <div className="ocean-banner">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=60&w=3000"
          alt="Ocean Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <StyledWrapper>
        <div
          className="lt"
          css={{
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          <TagList />
        </div>
        <div className="mid">
          <MobileProfileCard />
          <PinnedPosts q={q} />
          <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="tags">
            <TagList />
          </div>
          <FeedHeader />
          <PostList q={q} />
          <div className="footer">
            <Footer />
          </div>
        </div>
        <div
          className="rt"
          css={{
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          <ProfileCard />
          <ServiceCard />
          <ContactCard />
          <div className="footer">
            <Footer />
          </div>
        </div>
      </StyledWrapper>
    </>
  )
}

export default Feed

const StyledWrapper = styled.div`
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding: 2rem 0;
  display: grid;
  gap: 1.5rem;
`

const globalStyles = css`
  .ocean-banner {
    position: relative;
    width: 100%;
    height: 400px;
    margin-bottom: 2rem;
    border-radius: 0;
    overflow: hidden;
    
    @media (max-width: 768px) {
      height: 200px;
    }
  }
`
