import type { NextPage } from "next";
import Head from "next/head";
import HorizontalScroll from "../components/horizontal-scroll";
import axios from "axios";
import { useRouter } from "next/router";
import { Teacher } from "@prisma/client";

const Home: NextPage<{ teachers: Teacher[] }> = ({ teachers }) => {
  const router = useRouter();
  const onItemClick = (item: Teacher) => {
    router.push({
      pathname: "/teachers/[id]",
      query: { id: item.id },
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Codezilla appointments teachers page"
        />
        <link rel="icon" href="/favicon.ico" />
        <title>Masters</title>
      </Head>

      <main>
        <div className="text-center grid grid-cols-1 items-center h-full">
          <h1 className="font-serif text-5xl lg:text-5xl mb-4">
            Best in class Teachers
          </h1>
          <HorizontalScroll items={teachers} onItemClick={onItemClick} />
        </div>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const { data: teachers }: any = await axios.get(
    "https://codezilla-appointments.herokuapp.com/api/teachers"
  );
  return {
    props: {
      teachers,
    },
  };
}

export default Home;
