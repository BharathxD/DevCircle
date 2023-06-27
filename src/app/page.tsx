import { notFound } from "next/navigation"
import getCurrentUser from "@/actions/getCurrentUser"
import fetchPosts from "@/actions/getPosts"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"

import type { ExtendedPost } from "@/types/database"
import HomepageLayout from "@/components/Layout/HomepageLayout"
import PostFeed from "@/components/Post/PostFeed"
import SearchBar from "@/components/UI/SearchBar"
import CommunityLeaderboard from "@/components/Widgets/CommunityLeaderboard"
import CreateCommunity from "@/components/Widgets/CreateCommunity"
import JoinedCommunities from "@/components/Widgets/JoinedCommunities"

const Home = async () => {
  const currentUser = await getCurrentUser()
  const posts: ExtendedPost[] | null = await fetchPosts(
    INFINITE_SCROLL_PAGINATION_RESULTS
  )
  if (!posts) return notFound()
  return (
    <HomepageLayout>
      {/* Left */}
      <section className="hidden py-4 md:flex md:flex-col md:gap-5">
        <SearchBar />
        <JoinedCommunities />
      </section>
      {/* Middle */}
      <section className="no-scrollbar h-[91vh] w-full overflow-hidden overflow-y-scroll py-4 md:col-span-2 md:border-x-2 md:border-zinc-800 md:px-4">
        <PostFeed initialPosts={posts} userId={currentUser?.id} />
      </section>
      {/* Right */}
      <section className="hidden py-4 md:flex md:flex-col md:gap-5">
        <CreateCommunity />
        <CommunityLeaderboard />
      </section>
    </HomepageLayout>
  )
}

export default Home
