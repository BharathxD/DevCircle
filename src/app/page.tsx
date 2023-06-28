import { notFound } from "next/navigation"
import getCurrentUser from "@/actions/getCurrentUser"
import fetchPosts from "@/actions/getPosts"
import getSubscribedForums from "@/actions/getSubscribedForums"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"

import type { ExtendedPost } from "@/types/database"
import HomepageLayout from "@/components/Layout/HomepageLayout"
import PostFeed from "@/components/Post/PostFeed"
import SearchBar from "@/components/UI/SearchBar"
import CommunityLeaderboard from "@/components/Widgets/CommunityLeaderboard"
import CreateCommunity from "@/components/Widgets/CreateCommunity"
import FilterWidget from "@/components/Widgets/FilterWidget"
import SubscribedCommunities from "@/components/Widgets/SubscribedCommunities"

interface HomeProps {
  searchParams: {
    tag: string
  }
}

const Home = async ({ searchParams }: HomeProps) => {
  const { tag } = searchParams
  const currentUser = await getCurrentUser()
  const subscribedCommunities = await getSubscribedForums()
  const posts: ExtendedPost[] | null = await fetchPosts(
    tag,
    INFINITE_SCROLL_PAGINATION_RESULTS
  )
  if (!posts) return notFound()
  return (
    <HomepageLayout>
      {/* Left */}
      <section className="hidden py-4 md:flex md:flex-col md:gap-5">
        <SearchBar />
        <SubscribedCommunities forums={subscribedCommunities} />
        <FilterWidget />
      </section>
      {/* Middle */}
      <section className="no-scrollbar w-full overflow-hidden overflow-y-scroll py-4 md:col-span-2 md:border-x-2 md:border-zinc-800 md:px-4">
        <PostFeed
          initialPosts={posts}
          userId={currentUser?.id}
          filters={searchParams}
        />
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
