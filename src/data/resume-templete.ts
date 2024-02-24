const templetes: ResumeTemplate[] = [
  {
    id: 0,
    templeteName: "Classic",
    description: "Classic resume template",
    image: "/images/resume/classic.jpg",
    personalInfo: {
      name: true,
      email: true,
      phone: true,
      website: false,
      jobTitle: true,
      address: true,
    },
    social: 3,
    skills: 10,
  },
];

export default templetes;
