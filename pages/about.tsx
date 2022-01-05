import type { NextPage } from "next";
import Head from "next/head";

const heading = "Hello, I am Samrood Ali";
const position = "A Full Stack Web Developer obsessed with how things work.";
const aboutMe = `A Stoic and a Software developer. I wish to apply the principles of
            stoicism to both life and software development. I fell in love with
            programming during the corona lockdowns. I love philosophy and read
            self-help books in my spare time. I am more interested in the science
            behind or inner engineering of all technologies I come across and
            haven't limited myself to any "stack". Though I am learning both MERN
            stack as well Ruby on rails now, I can pick up any stack necessary or
            fun.
            `;

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="About Samrood Ali" />
        <link rel="icon" href="/favicon.ico" />
        <title>Samrood Ali</title>
      </Head>

      <main>
        <h1>{heading}</h1>
        <h2>{position}</h2>
        <p>{aboutMe}</p>
      </main>
    </>
  );
};

export default About;
