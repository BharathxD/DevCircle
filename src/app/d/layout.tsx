interface rootProps {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

export default function RootLayout({ children }: rootProps) {
  return <main className="container">{children}</main>;
}
