export const metadata = {
    title: "Finance Tracker",
    description: "Track your personal expenses",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body style={{ fontFamily: "sans-serif", background: "#f9f9f9", margin: 0 }}>
          {children}
        </body>
      </html>
    );
  }
  