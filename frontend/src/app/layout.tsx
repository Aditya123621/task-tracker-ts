import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import classes from "./active.module.css";
import { ClientWrapper } from "@/components/Common/ClientWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Tracker",
  description: "Track your task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme({
    autoContrast: true,
    activeClassName: classes.active,
    colors: {
      "ocean-blue": [
        "#7AD1DD",
        "#5FCCDB",
        "#44CADC",
        "#2AC9DE",
        "#1AC2D9",
        "#11B7CD",
        "#09ADC3",
        "#0E99AC",
        "#128797",
        "#147885",
      ],
      "bright-pink": [
        "#F0BBDD",
        "#ED9BCF",
        "#EC7CC3",
        "#ED5DB8",
        "#F13EAF",
        "#F71FA7",
        "#FF00A1",
        "#E00890",
        "#C50E82",
        "#AD1374",
      ],
      "lime-green": [
        "#F4FCE3",
        "#E9FAC8",
        "#DBF5A2",
        "#C0EB75",
        "#A9E34B",
        "#94D82D",
        "#82C91E",
        "#74B816",
        "#66A80F",
        "#5C940D",
      ],
    },
    primaryColor: "lime-green",
  });
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <MantineProvider theme={theme}>
          <ClientWrapper>{children}</ClientWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
