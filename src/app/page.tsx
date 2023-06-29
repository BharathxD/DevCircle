import { notFound } from "next/navigation"
import getCurrentUser from "@/actions/getCurrentUser"
import fetchPosts from "@/actions/getPosts"
import getSubscribedForums from "@/actions/getSubscribedForums"
import getTags from "@/actions/getTags"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"

import type { ExtendedPost } from "@/types/database"
import HomepageLayout from "@/components/Layout/HomepageLayout"
import PostFeed from "@/components/Post/PostFeed"
import { Input } from "@/components/UI/Input"
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
  const tags = await getTags()
  const posts: ExtendedPost[] | null = await fetchPosts(
    tag,
    INFINITE_SCROLL_PAGINATION_RESULTS
  )
  if (!posts) return notFound()
  return (
    <HomepageLayout>
      <section className="hidden py-4 md:flex md:flex-col md:gap-5">
        <Input />
        <SubscribedCommunities forums={subscribedCommunities} />
        <FilterWidget tags={tags} />
      </section>
      <section className="no-scrollbar relative w-full overflow-hidden overflow-y-scroll py-4 md:col-span-2 md:border-x-2 md:border-zinc-800 md:px-4 ">
        <PostFeed
          initialPosts={posts}
          userId={currentUser?.id}
          filters={searchParams}
        />
      </section>
      <section className="hidden py-4 md:flex md:flex-col md:gap-5">
        <CreateCommunity />
        <CommunityLeaderboard />
      </section>
    </HomepageLayout>
  )
}

export default Home
