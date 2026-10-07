// About page content: the path, the way I work (as a data lifecycle), and life beyond the day job.

export const path = [
  { place: "Tunis", period: "2016", text: "M.Sc. in Telecommunications Engineering, National Engineering School of Tunis." },
  { place: "Turin", period: "2019", text: "M.Sc. in ICT for Smart Societies, Politecnico di Torino." },
  { place: "Italy", period: "2020 — 2022", text: "Data scientist at NetValue (computer vision, NLP, forecasting), then data engineer at Luxoft (AWS data lake automation)." },
  { place: "Germany", period: "2022 — now", text: "Data scientist at ProGlove, ML engineer at Bonescreen, and data scientist at Publicis Sapient — GenAI and data platforms." },
];

export type WorkStep = {
  key: "pipelines" | "wrangling" | "eda" | "features" | "modelling" | "story";
  title: string;
  body: string;
  points: string[];
  proof: string[]; // project slugs
};

/** How I work, in the order data actually flows: from raw sources to a decision. */
export const workflow: WorkStep[] = [
  {
    key: "pipelines",
    title: "Data pipelines (ETL / ELT)",
    body: "Reliable data comes first. I build pipelines that land raw data, then clean and model it layer by layer.",
    points: ["Streaming, batch and incremental ingestion", "Medallion layers: raw → silver → gold → marts", "Scheduling, CI/CD and dev / prod environments"],
    proof: ["customer-360-data-platform", "realtime-analytics-snowflake"],
  },
  {
    key: "wrangling",
    title: "Data wrangling",
    body: "Real data is messy. I clean, deduplicate, validate and reconcile it, because every model downstream depends on its quality.",
    points: ["Cleaning, deduplication and schema validation", "Unifying records across systems without a shared key", "Automated data-quality and anomaly checks"],
    proof: ["aws-data-lake-automation", "battery-predictive-maintenance"],
  },
  {
    key: "eda",
    title: "Exploratory data analysis",
    body: "Before any model, I explore. EDA and statistical analysis show the patterns, anomalies and correlations in the data.",
    points: ["Patterns, anomalies and correlations", "Regression analysis and K-Means segmentation", "Sentiment trends over time and by topic"],
    proof: ["battery-predictive-maintenance", "airline-sentiment-analysis"],
  },
  {
    key: "features",
    title: "Feature engineering",
    body: "Good features carry domain knowledge into the model.",
    points: ["Seasonal and climate features from weather and soil data", "Features from device and sensor data", "Model selection with cross-validation"],
    proof: ["vineyard-yield-forecasting", "battery-predictive-maintenance"],
  },
  {
    key: "modelling",
    title: "Modelling, evaluation & production",
    body: "If I can't measure it, I can't ship it. Ground truth and the right metrics come with every model.",
    points: ["Ground-truth datasets and model benchmarking", "Dice, IoU, R², RMSE, MAE, precision and recall", "Deployment on AWS EC2, SageMaker and GCP"],
    proof: ["contract-intelligence-bedrock", "medical-imaging-segmentation"],
  },
  {
    key: "story",
    title: "Storytelling & data-driven decisions",
    body: "Insights only matter when they change a decision. I turn analysis into a clear story for stakeholders, make the case with evidence, and challenge assumptions when the data disagrees.",
    points: ["Dashboards in QuickSight and Plotly", "Presenting findings to stakeholders and engineering teams", "Defining KPIs with analytics and business teams"],
    proof: ["battery-predictive-maintenance", "airline-sentiment-analysis", "realtime-analytics-snowflake"],
  },
];

/**
 * Optional real photo for the "How I work" section — e.g. you presenting or teaching.
 * Put the file in /public/images and set: { src: "/images/presenting.jpg", alt: "…", caption: "…" }.
 */
export const workPhoto: { src: string; alt: string; caption?: string } | undefined = undefined;

export const beyond = [
  {
    title: "Teaching",
    org: "ReDI School of Digital Integration · Munich",
    text: "Machine learning teacher.",
  },
  {
    title: "Community",
    org: "Camminare Insieme ODV · Italy",
    text: "Computer operator.",
  },
  {
    title: "Writing & sharing",
    org: "Medium · GitHub · Kaggle",
    text: "Technical articles on Medium, Kaggle competitions, and an open interview question bank for data scientists on GitHub.",
  },
];
