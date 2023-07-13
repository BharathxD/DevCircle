interface rootProps {
  children: React.ReactNode;
}

export default async function ForumPageLayout({ children }: rootProps) {
  return <main className="container">{children}</main>;
}
