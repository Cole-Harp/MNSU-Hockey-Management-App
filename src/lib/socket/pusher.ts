import Pusher from "pusher";

//import this for server side event triggers to a channel
export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.KEY!,
  secret: process.env.SECRET!,
  cluster: process.env.CLUSTER!,
  useTLS: true
});

//trigger an event to a channel 
pusher.trigger("my-channel", "my-event", {
  message: "hello world" // Can be object as well
});
