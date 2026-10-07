// Certificates and programmes exactly as listed by Badiaa, newest first.
// Paste each credential's verification URL into `verifyUrl` to show a "Verify" link.

export type LearningItem = {
  title: string;
  provider: string;
  date: string;
  kind: "Certification" | "Professional certificate" | "Nanodegree" | "Specialization";
  /** Public verification link (Credly, Coursera, Udacity…). */
  verifyUrl?: string;
  /** Link to the work produced during the programme, e.g. a GitHub repo. */
  workUrl?: string;
  topics?: string[];
  draft?: boolean;
};

export const learning: LearningItem[] = [
  {
    title: "Machine Learning Specialization",
    provider: "DeepLearning.AI",
    date: "July 2025",
    kind: "Specialization",
  },
  {
    title: "IBM Machine Learning Professional Certificate",
    provider: "IBM · Coursera",
    date: "October 2022",
    kind: "Professional certificate",
  },
  {
    title: "IBM Data Analyst Professional Certificate",
    provider: "IBM · Coursera",
    date: "August 2022",
    kind: "Professional certificate",
  },
  {
    title: "Data Engineering Nanodegree",
    provider: "Udacity",
    date: "July 2022",
    kind: "Nanodegree",
    workUrl: "https://github.com/badiaamakhlouf/Udacity_DataEngineering_NanoDegree",
    topics: ["Data modelling (Postgres, Cassandra)", "Data warehouse", "Data lake with S3", "ETL pipelines with Airflow", "Capstone project"],
  },
  {
    title: "IBM Data Science Professional Certificate",
    provider: "IBM · Coursera",
    date: "July 2022",
    kind: "Professional certificate",
  },
  {
    title: "AWS Certified Solutions Architect – Associate",
    provider: "Amazon Web Services",
    date: "January 2021",
    kind: "Certification",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    provider: "Amazon Web Services",
    date: "October 2020",
    kind: "Certification",
  },
];

export const writing = {
  medium: "https://medium.com/@badiaa-makhlouf",
  kaggle: "https://www.kaggle.com/badiaamakhlouf",
  note: "I write technical blogs on Medium, take part in Kaggle competitions, and maintain open learning resources on GitHub.",
};
