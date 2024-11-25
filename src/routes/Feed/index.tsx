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

const HEADER_HEIGHT = 73

type Props = {}

const Feed: React.FC<Props> = () => {
  const [q, setQ] = useState("")

  return (
    <StyledWrapper>
      <div className="ocean-banner">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=60&w=3000"
          alt="Ocean Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="content-wrapper">
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
      </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  .ocean-banner {
    position: relative;
    width: 100%;
    height: 400px;
    margin-bottom: 2rem;
    overflow: hidden;
    
    @media (max-width: 768px) {
      height: 200px;
    }
  }

  .content-wrapper {
    max-width: 500px;
    margin: 0 auto;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 1.5rem;

    .lt {
      display: none;
      overflow: scroll;
      position: sticky;
      grid-column: span 2 / span 2;
      top: ${HEADER_HEIGHT - 10}px;

      @media (min-width: 1024px) {
        display: block;
      }

      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .mid {
      grid-column: span 12 / span 12;

      @media (min-width: 1024px) {
        grid-column: span 7 / span 7;
      }

      .tags {
        display: block;
        @media (min-width: 1024px) {
          display: none;
        }
      }

      .footer {
        padding-bottom: 2rem;
        @media (min-width: 1024px) {
          display: none;
        }
      }
    }

    .rt {
      display: none;
      overflow: scroll;
      position: sticky;
      top: ${HEADER_HEIGHT - 10}px;
      grid-column: span 3 / span 3;

      @media (min-width: 1024px) {
        display: block;
      }

      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }

      .footer {
        padding-top: 1rem;
      }
    }
  }
`
