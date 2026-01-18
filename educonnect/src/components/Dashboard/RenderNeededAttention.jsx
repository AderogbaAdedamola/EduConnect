import NeededAttention from "./NeededAttention";

const RenderNeededAtention = () => {
    const needsAttention = [
          {
            title: "How to solve quadratic equations?",
            code: "QE2847",
            responses: 23,
            newResponses: 8,
            aiEnabled: true,
            category: "Mathematics",
            timeAgo: "2h ago",
            status: "active"
          },
          {
            title: "Explain photosynthesis process",
            code: "BIO901",
            responses: 15,
            newResponses: 5,
            aiEnabled: true,
            category: "Biology",
            timeAgo: "5h ago",
            status: "active"
          },
          {
            title: "JavaScript async/await quiz",
            code: "JS4532",
            responses: 31,
            newResponses: 12,
            aiEnabled: false,
            category: "Programming",
            timeAgo: "1d ago",
            status: "pending"
          },
        ];

    return(
        <>
            { needsAttention.map((item, index) =>{
                    return (
                        <NeededAttention
                            key={index}
                            title={item.title}
                            code={item.code}
                            responses={item.responses}
                            newResponses={item.newResponses}
                            aiEnabled={item.aiEnabled}
                            category={item.category}
                            timeAgo={item.timeAgo}
                            status={item.status}
                        />
                    )
                })}
        </>
    )
}

export default RenderNeededAtention