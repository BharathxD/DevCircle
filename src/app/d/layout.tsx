interface rootProps {
  children: React.ReactNode;
}

export default function ForumPageLayout({ children }: rootProps) {
  return <main className="container">{children}</main>;
}
