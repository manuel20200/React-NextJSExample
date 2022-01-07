// our-domain.com/new-meetup
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }
  return (
    <React.Fragment>
      <Head>
        <title>Add new meetup</title>
        <meta
          name="description"
          content="Add your new meetup and create amazings recipes!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </React.Fragment>
  );
}

export default NewMeetupPage;
