export const electionData = [
  {
    id: "node-1",
    phase: "The Roster",
    subtitle: "Registration & Eligibility",
    blueprint: "Voter registration is the foundational step in the democratic process. It ensures that only eligible citizens participate, preventing fraud and ensuring fair representation. Registration deadlines vary by state, often closing 15 to 30 days before election day.",
    countdownText: "Closes 30 days prior",
    progress: 25,
    tasks: [
      { id: "task-1", label: "Verify Eligibility Criteria" },
      { id: "task-2", label: "Complete Registration Form" },
      { id: "task-3", label: "Check Voter Status Online" }
    ]
  },
  {
    id: "node-2",
    phase: "The Arena",
    subtitle: "Campaigns & Debates",
    blueprint: "During the campaign phase, candidates present their platforms and debate key issues. This is the critical period for voters to research policies, analyze debates, and understand the potential impact of each candidate's proposed legislation.",
    countdownText: "Ongoing until Election Day",
    progress: 50,
    tasks: [
      { id: "task-4", label: "Watch Primary Debates" },
      { id: "task-5", label: "Review Candidate Platforms" },
      { id: "task-6", label: "Identify Key Local Issues" }
    ]
  },
  {
    id: "node-3",
    phase: "The Ballot",
    subtitle: "Election Day Mechanics",
    blueprint: "Election Day is the culmination of the democratic process. Voters cast their ballots either in person at designated polling stations or via mail-in ballots. Strict procedures are followed to verify identities and ensure ballot secrecy.",
    countdownText: "November 5th",
    progress: 75,
    tasks: [
      { id: "task-7", label: "Locate Designated Polling Station" },
      { id: "task-8", label: "Prepare Valid Voter ID" },
      { id: "task-9", label: "Review Sample Ballot" }
    ]
  },
  {
    id: "node-4",
    phase: "The Tally",
    subtitle: "Results & Certification",
    blueprint: "After polls close, election officials begin the rigorous process of counting and verifying ballots. Once all valid votes are tallied, the results are audited and officially certified by state authorities, declaring the final winners.",
    countdownText: "Post-Election Period",
    progress: 100,
    tasks: [
      { id: "task-10", label: "Follow Official Call Projections" },
      { id: "task-11", label: "Understand Certification Process" }
    ]
  }
];
