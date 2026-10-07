// The "AI & Agentic AI" section: capabilities framed as engineering problems,
// each tied to the CV project where it was solved.

export const capabilities = [
  {
    key: "agents",
    title: "Agentic LLM applications",
    body: "Agentic LLM applications on Amazon Bedrock with the Strands Agents SDK: structured data extraction, source detection and multilingual normalisation.",
    tools: ["Amazon Bedrock", "Strands Agents", "Claude", "Qwen", "Llama"],
    proof: "contract-intelligence-bedrock",
  },
  {
    key: "llm",
    title: "LLM applications end to end",
    body: "A FastAPI backend serving the LLM workflows, a React/TypeScript front end, and deployment on AWS EC2 — built as a reusable framework.",
    tools: ["FastAPI", "React", "TypeScript", "AWS EC2"],
    proof: "contract-intelligence-bedrock",
  },
  {
    key: "eval",
    title: "Evaluation & benchmarking",
    body: "Ground-truth datasets from real contracts, exact-match, tolerance-based and semantic-similarity metrics, and benchmarks to select the production model.",
    tools: ["Ground truth", "Semantic similarity", "Model benchmarking"],
    proof: "contract-intelligence-bedrock",
  },
  {
    key: "dl",
    title: "Deep learning",
    body: "3D CNNs in PyTorch for CT and MRI segmentation, transfer learning from CT to MRI, and experiments tracked in MLflow.",
    tools: ["PyTorch", "3D CNNs", "MLflow", "Optuna"],
    proof: "medical-imaging-segmentation",
  },
  {
    key: "data",
    title: "Data foundations",
    body: "ETL/ELT pipelines, real-time and incremental ingestion, medallion modelling in BigQuery and cross-system identity resolution.",
    tools: ["BigQuery", "Cloud Run", "Snowflake", "dbt"],
    proof: "customer-360-data-platform",
  },
  {
    key: "cloud",
    title: "AWS & GCP",
    body: "AWS Certified Solutions Architect – Associate. Serverless automation on Lambda, SageMaker deployment, and GCP data platforms.",
    tools: ["Bedrock", "Lambda", "SageMaker", "GCP"],
    proof: "aws-data-lake-automation",
  },
] as const;
