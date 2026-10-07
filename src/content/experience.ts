// Entries with `draft: true` render (with a DRAFT badge) in `npm run dev` only,
// and are excluded from production builds.

export type Role = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  projects?: string[]; // project slugs — links the role to its evidence
  stack: string[];
  draft?: boolean;
};

export const experience: Role[] = [
  {
    company: "Publicis Sapient",
    role: "Data Scientist",
    period: "Nov 2025 — Present",
    location: "Munich, Germany",
    summary:
      "Client delivery in energy and hospitality: agentic LLM applications on AWS Bedrock and production data platforms on GCP.",
    highlights: [
      "Built an agentic contract-intelligence application on Amazon Bedrock and Strands Agents to automate PPA onboarding — FastAPI backend, React/TypeScript front end, deployed on EC2.",
      "Created a ground-truth dataset from real contracts and an LLM evaluation framework; benchmarked Claude, Qwen and Llama to select the production model.",
      "Designed and built a production Customer 360 platform on GCP integrating 5 sources, with cross-system identity resolution and ~25 BigQuery gold/mart tables feeding Braze and Salesforce.",
    ],
    projects: ["contract-intelligence-bedrock", "customer-360-data-platform"],
    stack: ["Amazon Bedrock", "Strands Agents", "Claude", "FastAPI", "React", "BigQuery", "Cloud Run"],
  },
  {
    company: "Bonescreen GmbH",
    role: "ML Engineer",
    period: "Oct 2024 — Oct 2025",
    summary:
      "Deep learning for medical imaging: 3D segmentation of full-body CT scans, then extending the approach to MRI spine analysis.",
    highlights: [
      "Built an end-to-end 3D CNN pipeline for full-body CT multi-organ segmentation in PyTorch — 0.82 Dice, validated with IoU and clinical review.",
      "Adapted the CT model to MRI via transfer learning, as a three-stage pipeline: spine detection, vertebrae labelling and voxel-level segmentation.",
      "Generated ground-truth masks with SPINEPS and manually validated annotations; built preprocessing and 3D augmentation for robustness across scanners.",
      "Automated hyperparameter search with Optuna and tracked experiments and model versions in MLflow.",
      "Worked in an Agile team with ML engineers and clinicians, using Jira, Bitbucket and Confluence.",
    ],
    projects: ["medical-imaging-segmentation"],
    stack: ["PyTorch", "MLflow", "Optuna", "Jira", "Bitbucket", "Confluence"],
  },
  {
    company: "Workaround GmbH (ProGlove)",
    role: "Data Scientist",
    period: "Sep 2022 — Aug 2024",
    summary: "Industrial IoT analytics: predictive maintenance for battery health, a near-real-time analytics platform and workforce behaviour analytics.",
    highlights: [
      "Built a predictive-maintenance solution for battery health — EDA, regression and K-Means segmentation of degradation, then ML models for failure prediction deployed for continuous monitoring.",
      "Designed a near-real-time analytics platform on AWS and Snowflake, integrating streaming and batch sources with dbt and AWS Glue transformations.",
      "Automated workforce behaviour analysis (shift durations, multitasking, workload, anomalies) from operational data on S3.",
      "Maintained version control, documentation and workflows with Git, Docker, CI/CD, Jira and Confluence.",
    ],
    projects: ["battery-predictive-maintenance", "realtime-analytics-snowflake"],
    stack: ["Python", "SQL", "Snowflake", "dbt", "AWS Glue", "scikit-learn", "Docker", "Jira"],
  },
  {
    company: "Luxoft Italy",
    role: "Data Engineer",
    period: "Oct 2021 — Jul 2022",
    summary: "Data lake automation on AWS: curation, data quality and storage cost optimisation.",
    highlights: [
      "Reduced AWS storage costs by 22% by optimising S3 storage classes and lifecycle policies.",
      "Built serverless data-quality workflows on AWS Lambda (validation, deduplication, anomaly detection) and cross-account storage analysis with least-privilege IAM.",
      "Built QuickSight dashboards to monitor data-lake health, usage and cost.",
    ],
    projects: ["aws-data-lake-automation"],
    stack: ["AWS Lambda", "S3", "IAM", "QuickSight", "Python", "pandas"],
  },
  {
    company: "NetValue",
    role: "Data Scientist",
    period: "Jun 2020 — Oct 2021",
    summary: "Applied ML across NLP, computer vision and agriculture.",
    highlights: [
      "Plant disease detection with VGG16 transfer learning in TensorFlow/Keras — 90% accuracy, fine-tuned on EC2 GPUs.",
      "Vineyard yield and harvest-timing forecasting with gradient boosting, deployed on AWS SageMaker with seasonal retraining.",
      "NLP sentiment analysis of airline customer chats with interactive Plotly dashboards surfacing refund and safety concerns.",
    ],
    projects: ["plant-disease-detection", "vineyard-yield-forecasting", "airline-sentiment-analysis"],
    stack: ["TensorFlow", "Keras", "scikit-learn", "AWS SageMaker", "NLTK", "Plotly"],
  },
];

export const education = [
  {
    school: "Politecnico di Torino",
    degree: "M.Sc. ICT for Smart Societies",
    year: "2019",
    href: "https://www.polito.it/en/education/master-s-degree-programmes/ict-for-smart-societies",
  },
  {
    school: "National Engineering School of Tunis (ENIT)",
    degree: "M.Sc. Telecommunications Engineering",
    year: "2016",
  },
];
