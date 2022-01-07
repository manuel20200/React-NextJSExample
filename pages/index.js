import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import React from "react";

const DUMMY_METTUPS = [
  {
    id: "m1",
    title: "A first meetup",
    image:
      "https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf-970-80.jpg.webp",
    address: "Some address",
    description: "Some description",
  },
  {
    id: "m2",
    title: "A second meetup",
    image:
      "https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf-970-80.jpg.webp",
    address: "Some address",
    description: "Some description",
  },
];

function HomePage(props) {
  /* const [loadedMeetups, setLoadedMeetups] = useState([]);
    useEffect(() => {
        // send a http request and fetch data
        setLoadedMeetups(DUMMY_METTUPS);
    }); */
  return (
    <React.Fragment>
      <Head>
        <title>React Meetups with NextJS</title>
        <meta
          name="description"
          content="Watch a huge list of highly active React mmetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </React.Fragment>
  );
}

/* export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    // fetch data from an API / DB
    return {
        props: {
            meetups: DUMMY_METTUPS
        }
    };
} */

// data fetching for pre-rendering
export async function getStaticProps() {
  // fetch data from an API / DB

  const client = await MongoClient.connect(
    "mongodb+srv://kike:8xModV33pbyOhYBd@cluster0.fghv7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const mettupsCollection = db.collection("meetups");

  const meetups = await mettupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
