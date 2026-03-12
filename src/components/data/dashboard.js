// ─── Leave Requests ────────────────────────────────────────────────────────
export const leaveRequestsData = [
  { id:1,  name:"Sarah Johnson",   role:"Frontend Dev",       type:"Vacation",   duration:"May 15–19", status:"pending",  avatar:"https://i.pravatar.cc/40?img=1"  },
  { id:2,  name:"Michael Chen",    role:"Backend Dev",        type:"Sick Leave", duration:"May 10–12", status:"approved", avatar:"https://i.pravatar.cc/40?img=2"  },
  { id:3,  name:"Emily Rodriguez", role:"UX Designer",        type:"Vacation",   duration:"May 20–24", status:"pending",  avatar:"https://i.pravatar.cc/40?img=3"  },
  { id:4,  name:"James Smith",     role:"Product Manager",    type:"Personal",   duration:"May 18",    status:"pending",  avatar:"https://i.pravatar.cc/40?img=4"  },
  { id:5,  name:"Olivia Williams", role:"QA Engineer",        type:"Medical",    duration:"May 22-23", status:"approved", avatar:"https://i.pravatar.cc/40?img=5"  },
  { id:6,  name:"William Brown",   role:"DevOps Engineer",    type:"Vacation",   duration:"May 25-28", status:"rejected", avatar:"https://i.pravatar.cc/40?img=6"  },
  { id:7,  name:"Sophia Davis",    role:"Marketing",          type:"Sick Leave", duration:"May 16-17", status:"pending",  avatar:"https://i.pravatar.cc/40?img=7"  },
  { id:8,  name:"Lucas Miller",    role:"Frontend Dev",       type:"Personal",   duration:"May 19",    status:"approved", avatar:"https://i.pravatar.cc/40?img=8"  },
  { id:9,  name:"Anika Singh",     role:"Data Analyst",       type:"Vacation",   duration:"May 12-14", status:"pending",  avatar:"https://i.pravatar.cc/40?img=9"  },
  { id:10, name:"Ravi Kumar",      role:"Backend Dev",        type:"Medical",    duration:"May 8",     status:"rejected", avatar:"https://i.pravatar.cc/40?img=10" },
];

// ─── Students ───────────────────────────────────────────────────────────────
export const studentsData = [
  { id:1,  name:"Aarav Sharma",    rollNo:"CS2101", dept:"Computer Science",  year:2, attendance:92, status:"present", avatar:"https://i.pravatar.cc/40?img=11" },
  { id:2,  name:"Priya Patel",     rollNo:"CS2102", dept:"Computer Science",  year:2, attendance:78, status:"absent",  avatar:"https://i.pravatar.cc/40?img=12" },
  { id:3,  name:"Ravi Kumar",      rollNo:"EC2103", dept:"Electronics",       year:2, attendance:85, status:"present", avatar:"https://i.pravatar.cc/40?img=13" },
  { id:4,  name:"Sneha Joshi",     rollNo:"CS2104", dept:"Computer Science",  year:2, attendance:96, status:"present", avatar:"https://i.pravatar.cc/40?img=14" },
  { id:5,  name:"Arjun Nair",      rollNo:"ME2105", dept:"Mechanical Eng.",   year:2, attendance:61, status:"absent",  avatar:"https://i.pravatar.cc/40?img=15" },
  { id:6,  name:"Meera Reddy",     rollNo:"CS3106", dept:"Computer Science",  year:3, attendance:88, status:"present", avatar:"https://i.pravatar.cc/40?img=16" },
  { id:7,  name:"Kiran Verma",     rollNo:"EC3107", dept:"Electronics",       year:3, attendance:71, status:"present", avatar:"https://i.pravatar.cc/40?img=17" },
  { id:8,  name:"Anika Singh",     rollNo:"CS3108", dept:"Computer Science",  year:3, attendance:99, status:"present", avatar:"https://i.pravatar.cc/40?img=18" },
  { id:9,  name:"Deepak Malhotra", rollNo:"ME3109", dept:"Mechanical Eng.",   year:3, attendance:54, status:"absent",  avatar:"https://i.pravatar.cc/40?img=19" },
  { id:10, name:"Pooja Iyer",      rollNo:"CS4110", dept:"Computer Science",  year:4, attendance:90, status:"present", avatar:"https://i.pravatar.cc/40?img=20" },
  { id:11, name:"Varun Gupta",     rollNo:"EC4111", dept:"Electronics",       year:4, attendance:83, status:"present", avatar:"https://i.pravatar.cc/40?img=21" },
  { id:12, name:"Ishaan Das",      rollNo:"CS4112", dept:"Computer Science",  year:4, attendance:67, status:"absent",  avatar:"https://i.pravatar.cc/40?img=22" },
  { id:13, name:"Fatima Khan",     rollNo:"CS1113", dept:"Computer Science",  year:1, attendance:74, status:"present", avatar:"https://i.pravatar.cc/40?img=23" },
  { id:14, name:"Rohan Mehta",     rollNo:"ME1114", dept:"Mechanical Eng.",   year:1, attendance:58, status:"absent",  avatar:"https://i.pravatar.cc/40?img=24" },
  { id:15, name:"Nisha Sharma",    rollNo:"EC1115", dept:"Electronics",       year:1, attendance:81, status:"present", avatar:"https://i.pravatar.cc/40?img=25" },
];

// ─── Notifications ──────────────────────────────────────────────────────────
export const notificationsData = [
  { id:1,  type:"leave",   title:"New Leave Request",         body:"Sarah Johnson submitted a vacation request for May 15–19.",   time:"2m ago",   read:false },
  { id:2,  type:"alert",   title:"Low Attendance Alert",      body:"Arjun Nair's attendance has dropped below 65%.",              time:"14m ago",  read:false },
  { id:3,  type:"approve", title:"Leave Approved",            body:"Michael Chen's sick leave (May 10–12) has been approved.",    time:"1h ago",   read:false },
  { id:4,  type:"leave",   title:"New Leave Request",         body:"Emily Rodriguez requested vacation for May 20–24.",           time:"2h ago",   read:true  },
  { id:5,  type:"alert",   title:"Critical Attendance",       body:"Deepak Malhotra is at 54% — academic risk threshold.",        time:"3h ago",   read:true  },
  { id:6,  type:"approve", title:"Leave Rejected",            body:"William Brown's vacation (May 25–28) was rejected.",          time:"5h ago",   read:true  },
  { id:7,  type:"system",  title:"Monthly Report Ready",      body:"May 2026 attendance summary is now available in Reports.",    time:"1d ago",   read:true  },
];

// ─── Sidebar Nav ────────────────────────────────────────────────────────────
export const navItems = [
  { label:"Dashboard", href:"/dashboard" },
  { label:"Students",  href:"/dashboard/students" },
  { label:"Reports",   href:"/dashboard/reports" },
  { label:"Settings",  href:"/dashboard/settings" },
];
