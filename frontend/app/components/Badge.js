const Badge = ({ type, count }) => {
  const badges = {
    beginner: {
      title: 'Beginner Walker',
      threshold: 5000,
      color: 'text-amber-700',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L8 8L2 9.27L6 14.14L5.27 20L12 17.77L18.73 20L18 14.14L22 9.27L16 8L12 2Z" />
          <path fill="#CD7F32" d="M12 4L14.8 8.2L19.2 9.1L16 12.3L16.6 16.7L12 15L7.4 16.7L8 12.3L4.8 9.1L9.2 8.2L12 4Z" />
        </svg>
      )
    },
    intermediate: {
      title: 'Active Walker',
      threshold: 10000,
      color: 'text-gray-400',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L8 8L2 9.27L6 14.14L5.27 20L12 17.77L18.73 20L18 14.14L22 9.27L16 8L12 2Z" />
          <path fill="#C0C0C0" d="M12 4L14.8 8.2L19.2 9.1L16 12.3L16.6 16.7L12 15L7.4 16.7L8 12.3L4.8 9.1L9.2 8.2L12 4Z" />
        </svg>
      )
    },
    advanced: {
      title: 'Power Walker',
      threshold: 15000,
      color: 'text-yellow-500',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L8 8L2 9.27L6 14.14L5.27 20L12 17.77L18.73 20L18 14.14L22 9.27L16 8L12 2Z" />
          <path fill="#FFD700" d="M12 4L14.8 8.2L19.2 9.1L16 12.3L16.6 16.7L12 15L7.4 16.7L8 12.3L4.8 9.1L9.2 8.2L12 4Z" />
        </svg>
      )
    }
  };

  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg bg-white shadow-sm border border-gray-100`}>
      {badges[type].icon}
      <span className={`${badges[type].color} font-medium`}>
        {badges[type].title}
      </span>
    </div>
  );
};

export default Badge;
