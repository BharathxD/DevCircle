export default async function ForumPageLayout({
  children,
}: React.PropsWithChildren) {
  return <main className="container">{children}</main>;
}
