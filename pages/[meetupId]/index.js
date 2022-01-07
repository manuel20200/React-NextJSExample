import Head from "next/head";
import React, { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </React.Fragment>
  );
}

// below from here the code is running only during build time
export async function getStaticPaths() {
  // path array normally should be fetching from a DB
  const client = await MongoClient.connect(
    "mongodb+srv://kike:8xModV33pbyOhYBd@cluster0.fghv7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const mettupsCollection = db.collection("meetups");

  const meetups = await mettupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://kike:8xModV33pbyOhYBd@cluster0.fghv7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const mettupsCollection = db.collection("meetups");

  const selectedMeetup = await mettupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
