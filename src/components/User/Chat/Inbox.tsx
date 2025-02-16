import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { Input } from "./Input";
import { ScrollArea } from "./ScrollArea";
import { cn } from "../../../utils/InboxUtils";
import { ArrowLeft, Car, Image, Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { Message, User } from "../../../interfaces/interface";
import axiosChat from '../../../service/axios/axiosChat'
// import { useSocket } from "../../../context/SocketContext"
import { useSelector } from "react-redux"

// Mock data for users and messages
// const initialUsers = [
//   {
//     id: 1,
//     name: "Alice",
//     avatar: "/placeholder.svg?height=40&width=40",
//     lastMessage: "See you at 5!",
//   },
//   {
//     id: 2,
//     name: "Bob",
//     avatar: "/placeholder.svg?height=40&width=40",
//     lastMessage: "I'm running late.",
//   },
//   {
//     id: 3,
//     name: "Charlie",
//     avatar: "/placeholder.svg?height=40&width=40",
//     lastMessage: "Can we reschedule?",
//   },
//   {
//     id: 4,
//     name: "Diana",
//     avatar: "/placeholder.svg?height=40&width=40",
//     lastMessage: "Thanks for the ride!",
//   },
//   {
//     id: 5,
//     name: "Ethan",
//     avatar: "/placeholder.svg?height=40&width=40",
//     lastMessage: "Where should we meet?",
//   },
// ];

// const messages = [
//   {
//     id: 1,
//     senderId: 1,
//     text: "Hey, are we still on for the carpool today?",
//     timestamp: "10:30 AM",
//   },
//   {
//     id: 2,
//     senderId: 0,
//     text: "Yes, I'll pick you up at 5 PM.",
//     timestamp: "10:32 AM",
//   },
//   { id: 3, senderId: 1, text: "Great! See you then.", timestamp: "10:33 AM" },
//   {
//     id: 4,
//     senderId: 0,
//     text: "Don't forget your water bottle!",
//     timestamp: "10:35 AM",
//   },
//   {
//     id: 5,
//     senderId: 1,
//     text: "Thanks for the reminder. See you at 5!",
//     timestamp: "10:36 AM",
//   },
// ];

const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_S3_REGION;

export default function Inbox() {
  const {userId} = useSelector(
    (store: { user: { userId: string } }) =>
      store.user
  );
  // const socket  = useSocket()
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const { riderDetails } = useParams<{ riderDetails?: string }>();

  useEffect(() => {
    if (riderDetails) {
      const parsedDetails = JSON.parse(decodeURIComponent(riderDetails));
      console.log(parsedDetails, "fdsffsddf");

      const existingUser = users.find((user) => user.id === parsedDetails._id);
      if (existingUser) {
        setSelectedUser(existingUser);
      } else {
        // Add the new user and select them
        const newUser = {
          id: parsedDetails._id,
          name: parsedDetails.name,
          avatar: parsedDetails.userImage
            ? `https://${BUCKET}.s3.${REGION}.amazonaws.com/${parsedDetails.userImage}`
            : "/userdefault.jpg",
          lastMessage: "",
        };
        setUsers((prevUsers) => [newUser, ...prevUsers]);
        setSelectedUser(newUser);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riderDetails,users]);

  useEffect(() => {
    axiosChat()
      .get<User[]>(`/inboxUsers?userId=${userId}`) 
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [userId]);

  useEffect(() => {
    if (selectedUser) {
      axiosChat()
        .get<Message[]>(`/messages?userId=${selectedUser.id}&currentUserId=${userId}`) 
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [selectedUser,userId]);

  return (
    <div className="flex h-[87vh] bg-gradient-to-br from-blue-100 to-green-100 sticky top-0">
      {/* Left sidebar with user list */}
      <div className="w-full max-w-xs border-r bg-white bg-opacity-80 backdrop-blur-sm">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Inbox</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={cn(
                "flex items-center w-full p-4 hover:bg-gray-200 transition-colors",
                selectedUser?.id === user.id && "bg-gray-200"
              )}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 text-left">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {user.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Right side with messages or welcome screen */}
      <div className="flex-1 flex flex-col bg-white bg-opacity-80 backdrop-blur-sm">
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="p-4 border-b flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedUser(null)}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to welcome screen</span>
              </Button>
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                />
                <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-300 ">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "mb-4 max-w-[65%] p-3 rounded-lg shadow-sm",
                    message.senderId === 0
                      ? "bg-gray-800 text-white ml-auto border border-gray-900"
                      : "bg-white text-slate-800 border border-gray-300"
                  )}
                >
                  <p>{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                </div>
              ))}
            </ScrollArea>

            {/* Message input */}
            <div className="p-4 border-t flex items-center">
              <Input className="flex-1 mr-4" placeholder="Type a message..." />
              <Button variant="outline" size="icon" className="mr-2">
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Image className="h-4 w-4" />
                  <span className="sr-only">Upload photo</span>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    // Handle photo upload here
                    console.log("Photo selected:", e.target.files?.[0]);
                  }}
                />
              </Button>
              <Button size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </>
        ) : (
          // Welcome screen
          <div className="flex flex-col items-center justify-center h-full">
            <Car className="h-24 w-24 text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-2">Welcome to CarPool Chat</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Select a conversation from the left to start chatting with your
              carpool buddies!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
