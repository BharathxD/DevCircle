export { default } from "next-auth/middleware";

// The following routes are protected routes
export const config = {
  matcher: [
    "/d/:forumId/edit",
    "/d/:forumId/submit",
    "/d/new",
    "/subscribed",
    "/profile",
    "/api/forum/:forumId/subscription",
    "/api/forum/post/vote",
    "/api/forum/post/comment/vote",
  ],
};
