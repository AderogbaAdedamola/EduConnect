

const Recents = ({
  avatar,
  user,
  timeAgo,
  action,
  question,
  type
}) => {


  return (
      <div
        className="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 dark:text-white font-medium">
            <span className="font-bold">{user}</span> {action}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm truncate">"{question}"</p>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {timeAgo}
        </span>
      </div>
  );
};

export default Recents;