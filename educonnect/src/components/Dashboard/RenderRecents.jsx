import Recents from "./Recents"

const RenderRecents = () =>{
     const recentActivity = [
    {
      type: "response",
      user: "Sarah M.",
      action: "answered your question",
      question: "What is Newton's Third Law?",
      timeAgo: "10m ago",
      avatar: "S"
    },
    {
      type: "created",
      user: "You",
      action: "created a question",
      question: "Explain DNA replication",
      timeAgo: "2h ago",
      avatar: "Y"
    },
    {
      type: "ai_feedback",
      user: "AI Assistant",
      action: "provided feedback on",
      question: "How does gravity work?",
      timeAgo: "3h ago",
      avatar: "🤖"
    },
    {
      type: "response",
      user: "John D.",
      action: "answered your question",
      question: "What is photosynthesis?",
      timeAgo: "5h ago",
      avatar: "J"
    },
  ];
  return (
    <>
    {recentActivity.map((activity, index) =>{
        return(
            <Recents 
                key={index}
                avatar={activity.avatar}
                user={activity.user}
                timeAgo={activity.timeAgo}
                action={activity.action}
                question={activity.question}
                type={activity.type}
            />
        )
    })}
    </>
  )
}

export default RenderRecents