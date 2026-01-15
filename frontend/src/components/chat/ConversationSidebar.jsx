const ConversationSidebar = ({ conversations, activeId, onSelect }) => {
  return (
    <aside className="w-64 border-r bg-white overflow-y-auto">
      <h3 className="p-4 font-semibold">Your Chats</h3>
      {conversations.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
            c.id === activeId ? "bg-gray-200" : ""
          }`}
        >
          {c.title || "New conversation"}
        </button>
      ))}
    </aside>
  );
};

export default ConversationSidebar;
