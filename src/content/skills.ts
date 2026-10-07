// Skills come only from the CV and the work it describes. Each links to the
// project where it was used, when there is one.

export type SkillGroup = {
  title: string;
  description: string;
  logos: string[];
  skills: { name: string; evidence?: string[] }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Generative & agentic AI",
    description: "LLM applications built with agents on AWS, evaluated against real data.",
    logos: ["Amazon Bedrock", "Strands Agents", "Claude", "Qwen", "Llama"],
    skills: [
      { name: "Amazon Bedrock", evidence: ["contract-intelligence-bedrock"] },
      { name: "Strands Agents SDK", evidence: ["contract-intelligence-bedrock"] },
      { name: "LLM structured data extraction & source detection", evidence: ["contract-intelligence-bedrock"] },
      { name: "Multilingual normalisation", evidence: ["contract-intelligence-bedrock"] },
      { name: "LLM evaluation: ground truth, exact match, semantic similarity", evidence: ["contract-intelligence-bedrock"] },
      { name: "LLM benchmarking (Claude, Qwen, Llama)", evidence: ["contract-intelligence-bedrock"] },
    ],
  },
  {
    title: "Machine learning & deep learning",
    description: "From classical ML to 3D deep learning.",
    logos: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "Optuna"],
    skills: [
      { name: "PyTorch", evidence: ["medical-imaging-segmentation"] },
      { name: "TensorFlow / Keras", evidence: ["plant-disease-detection"] },
      { name: "scikit-learn", evidence: ["vineyard-yield-forecasting", "battery-predictive-maintenance"] },
      { name: "3D CNNs & medical image segmentation", evidence: ["medical-imaging-segmentation"] },
      { name: "Transfer learning", evidence: ["medical-imaging-segmentation", "plant-disease-detection"] },
      { name: "Regression, clustering & predictive maintenance", evidence: ["battery-predictive-maintenance", "vineyard-yield-forecasting"] },
      { name: "NLP & sentiment analysis (NLTK)", evidence: ["airline-sentiment-analysis"] },
      { name: "Hyperparameter tuning (Optuna, GridSearchCV)", evidence: ["medical-imaging-segmentation", "vineyard-yield-forecasting"] },
    ],
  },
  {
    title: "Data science & analytics",
    description: "Turning data into insights and decisions.",
    logos: ["pandas", "NumPy", "Plotly", "Matplotlib", "QuickSight"],
    skills: [
      { name: "Exploratory data analysis", evidence: ["battery-predictive-maintenance"] },
      { name: "Feature engineering", evidence: ["vineyard-yield-forecasting", "battery-predictive-maintenance"] },
      { name: "Data wrangling with pandas & NumPy", evidence: ["vineyard-yield-forecasting"] },
      { name: "Statistical modelling", evidence: ["battery-predictive-maintenance"] },
      { name: "Dashboards: QuickSight, Plotly, Matplotlib, Seaborn", evidence: ["aws-data-lake-automation", "airline-sentiment-analysis"] },
      { name: "KPIs and insights for stakeholders", evidence: ["realtime-analytics-snowflake"] },
    ],
  },
  {
    title: "Data engineering & ETL",
    description: "The pipelines and platforms underneath every model.",
    logos: ["BigQuery", "Snowflake", "dbt", "AWS Glue", "Parquet"],
    skills: [
      { name: "Python ETL / ELT pipelines", evidence: ["customer-360-data-platform", "realtime-analytics-snowflake"] },
      { name: "BigQuery & SQL", evidence: ["customer-360-data-platform"] },
      { name: "Medallion architecture (raw → silver → gold → marts)", evidence: ["customer-360-data-platform"] },
      { name: "Cross-system identity resolution", evidence: ["customer-360-data-platform"] },
      { name: "Snowflake & dbt", evidence: ["realtime-analytics-snowflake"] },
      { name: "AWS Glue, Athena & Parquet" },
      { name: "Streaming, batch and incremental ingestion", evidence: ["customer-360-data-platform", "realtime-analytics-snowflake"] },
    ],
  },
  {
    title: "Cloud & MLOps",
    description: "AWS and GCP, from serverless automation to model deployment.",
    logos: ["AWS", "GCP", "MLflow", "Docker", "FastAPI"],
    skills: [
      { name: "AWS Certified Solutions Architect – Associate" },
      { name: "AWS: EC2, S3, Lambda, IAM, SageMaker", evidence: ["aws-data-lake-automation", "vineyard-yield-forecasting"] },
      { name: "GCP: Cloud Run, Cloud Storage, Cloud Build, Cloud Scheduler, Secret Manager", evidence: ["customer-360-data-platform"] },
      { name: "MLflow experiment tracking", evidence: ["medical-imaging-segmentation"] },
      { name: "Docker, CI/CD, dev / prod environments", evidence: ["customer-360-data-platform"] },
      { name: "FastAPI backends & React / TypeScript front ends", evidence: ["contract-intelligence-bedrock"] },
    ],
  },
];

/** Agile delivery, as described on the CV. */
export const agile = {
  summary:
    "I work in Agile teams — Scrum, Extreme Programming (XP) and Kanban — with ML engineers, clinicians, analytics and business stakeholders, keeping code, documentation and delivery in shared tools.",
  methods: ["Scrum", "Extreme Programming (XP)", "Kanban"],
  practices: [
    "Sprints and iterative delivery in cross-functional teams",
    "Version control, code review and CI/CD",
    "Documentation and tickets in Confluence and Jira",
    "Working closely with domain experts and business teams",
  ],
  tools: ["Jira", "Confluence", "Git", "GitHub", "GitLab", "Bitbucket"],
};
