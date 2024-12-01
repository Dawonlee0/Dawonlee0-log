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
import { useRouter } from "next/router"
import VisitorCounter from "src/components/VisitorCounter"

const HEADER_HEIGHT = 73

type Props = {}

const Feed: React.FC<Props> = () => {
  const router = useRouter()
  const [q, setQ] = useState("")

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      router.back()
    }
  }

  return (
    <StyledWrapper>
      <div className="content-wrapper" onClick={handleBackgroundClick}>
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
          <div className="mobile-tags">
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
      <div className="visitor-counter">
        <VisitorCounter />
      </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 1.5rem;
    min-height: calc(100vh - ${HEADER_HEIGHT}px - 200px);
    cursor: pointer;

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

      .footer {
        padding-bottom: 2rem;
        @media (min-width: 1024px) {
          display: none;
        }
      }

      .mobile-tags {
        display: block;
        margin: 1rem 0;

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

  .visitor-counter {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 50;
  }
`
