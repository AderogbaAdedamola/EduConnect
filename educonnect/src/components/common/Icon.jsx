import React from 'react';
// import * as Icons from '@mui/icons-material';


// const iconMap = {
//   // Dashboard icons
//   home: Icons.Home,
//   class: Icons.Class,
//   auto_stories: Icons.AutoStories,
//   analytics: Icons.Analytics,
//   settings: Icons.Settings,
//   school: Icons.School,
//   notifications: Icons.Notifications,
//   add: Icons.Add,
//   light_mode: Icons.LightMode,
//   dark_mode: Icons.DarkMode,
//   check_circle: Icons.CheckCircle,
//   pending_actions: Icons.PendingActions,
//   trending_up: Icons.TrendingUp,
//   filter_list: Icons.FilterList,
//   arrow_forward: Icons.ArrowForward,
//   visibility: Icons.Visibility,
//   chevron_right: Icons.ChevronRight,
  
//   // Assignment icons
//   biotech: Icons.Biotech,
//   public: Icons.Public,
//   architecture: Icons.Architecture,
//   menu_book: Icons.MenuBook,
//   science: Icons.Science,
//   palette: Icons.Palette,
  
//   // Misc
//   notifications: Icons.Notifications,
// };

// const Icon = ({ name, className = '', ...props }) => {
//   const IconComponent = iconMap[name];
  
//   if (!IconComponent) {
//     console.warn(`Icon "${name}" not found`);
//     return <span>?</span>;
//   }
//   return <IconComponent className={className} {...props} />;
// };

// export default Icon;


const Icon = ({ name, className = '' }) => {
  return (
    <span className={`material-symbols-outlined ${className}`} style={{fontVariationSettings:" 'FILL' 1"}}>
      {name}
    </span>
  ) 
}

export default Icon;
