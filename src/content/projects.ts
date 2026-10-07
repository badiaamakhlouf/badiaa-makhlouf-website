// Projects are the core of the site. Each one follows the same arc:
// what I built → how I built it → why it matters → evidence.
//
// Client work is anonymised by industry. Before naming a client, check your NDA.
// Anything marked TODO is a fact only you can supply — never publish an invented metric.

export type NodeKind = "input" | "agent" | "model" | "service" | "store" | "guard" | "output";

export type ArchNode = {
  id: string;
  label: string;
  sub?: string;
  kind: NodeKind;
  /** Grid position: columns flow left → right, rows top → bottom. */
  col: number;
  row: number;
  detail: string;
};

export type ArchEdge = {
  from: string;
  to: string;
  label?: string;
  /** Dashed edge for optional / fallback / feedback paths. */
  dashed?: boolean;
};

export const categories = ["Generative AI", "Deep learning", "Machine learning", "Data engineering"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  context: string;
  year: string;
  status: "In production" | "Deployed" | "Delivered" | "PoC delivered";
  domain: string;
  category: Category;
  featured: boolean;
  summary: string;
  problem: string[];
  solution: string[];
  architecture: {
    caption: string;
    nodes: ArchNode[];
    edges: ArchEdge[];
  };
  decisions: { title: string; body: string }[];
  stack: { group: string; items: string[] }[];
  contribution: string[];
  results: { label: string; value: string }[];
  evidence: { label: string; href?: string; note?: string }[];
  links: { github?: string; demo?: string };
  /** Optional cover image in /public, e.g. "/images/projects/<slug>.jpg". */
  cover?: { src: string; alt: string };
};

export const projects: Project[] = [
  {
    slug: "contract-intelligence-bedrock",
    title: "Contract Intelligence on AWS Bedrock",
    tagline: "Agentic extraction of 25 commercial terms from Power Purchase Agreements — with an evaluation harness that proves it.",
    context: "European energy utility · Client engagement",
    year: "2026",
    status: "PoC delivered",
    domain: "Document AI · Agents",
    category: "Generative AI",
    featured: true,
    summary:
      "A config-driven pipeline that reads long, heterogeneous PPA contracts, routes each chunk to the right extraction agent, normalises units and currencies, and scores every field against analyst-maintained ground truth.",
    problem: [
      "Onboarding physical and financial Power Purchase Agreements required extracting structured data from long, multilingual contracts by hand.",
      "Extraction quality had to be measured against real contracts, and the best model selected, before the approach could go to production.",
    ],
    solution: [
      "Split extraction into stages: chunk the document with overlap, classify which field groups each chunk is relevant to, then run schema-bound extraction only on relevant chunks.",
      "Built the agents with Strands Agents on Amazon Bedrock (Claude Sonnet 4 and Qwen3-VL configured as models), returning typed Pydantic objects.",
      "A typed PPA schema declares each field's data type, expected unit (MW, MWh) and currency, so post-processing can normalise values and flag anything that does not fit.",
      "An evaluation harness compares predictions with a ground-truth dataset built from real contracts: exact match for categorical and date fields, tolerance-based comparison for numbers, semantic similarity for free text — plus missing-value analysis, rendered as PDF KPI reports.",
      "Served through a FastAPI backend with a React/TypeScript front end on AWS EC2, designed as a reusable framework for other energy-trading clients.",
    ],
    architecture: {
      caption: "Four CLI stages — preprocess → extract → evaluate → visualise — each driven by its own YAML config.",
      nodes: [
        { id: "docs", label: "PPA contracts", sub: ".docx · PDF", kind: "input", col: 0, row: 1, detail: "Heterogeneous, multi-language contracts. Each contract lives in its own folder so chunks never mix across documents." },
        { id: "jira", label: "Jira exports", sub: "ground truth", kind: "input", col: 0, row: 2, detail: "Jira exports used as ground truth: fields extracted with the same pipeline, then manually reviewed and corrected where missing or wrong." },
        { id: "prep", label: "Preprocessor", sub: "chunk · 300-char overlap", kind: "service", col: 1, row: 1, detail: "python-docx and pdfplumber load the text; fixed-size chunks with a 300-character overlap keep clauses that span a boundary intact. A manifest records every chunk for traceability." },
        { id: "bedrock", label: "Bedrock", sub: "Claude Sonnet 4 · Qwen3-VL", kind: "model", col: 2.5, row: 0, detail: "Amazon Bedrock in eu-west-1. Model IDs and inference parameters are set in configuration." },
        { id: "classify", label: "Classifier", sub: "Strands agent", kind: "agent", col: 2, row: 1, detail: "Decides which field groups each chunk is relevant to, before extraction." },
        { id: "extract", label: "Extractor", sub: "schema-bound agent", kind: "agent", col: 3, row: 1, detail: "Prompted from YAML templates and returning Pydantic models, so every answer is typed." },
        { id: "post", label: "Normaliser", sub: "units · currency · dates", kind: "service", col: 4, row: 1, detail: "Uses the PPA schema (data type, unit, currency) to normalise extracted values." },
        { id: "eval", label: "Evaluator", sub: "exact · tolerance · semantic", kind: "guard", col: 5, row: 1, detail: "Exact match for categorical and date fields, tolerance-based comparison for numbers, sentence-transformer semantic similarity for free text. Per-contract and global comparison CSVs." },
        { id: "report", label: "KPI reports", sub: "PDF", kind: "output", col: 6, row: 1, detail: "missing_report.pdf (missing fields in ground truth and predictions) and kpi_visualizations.pdf (evaluation KPIs)." },
      ],
      edges: [
        { from: "docs", to: "prep" },
        { from: "prep", to: "classify", label: "chunks" },
        { from: "classify", to: "extract", label: "relevant" },
        { from: "bedrock", to: "classify", dashed: true },
        { from: "bedrock", to: "extract", dashed: true },
        { from: "extract", to: "post", label: "typed" },
        { from: "post", to: "eval" },
        { from: "jira", to: "eval", label: "ground truth" },
        { from: "eval", to: "report" },
      ],
    },
    decisions: [
      { title: "Classify before extracting", body: "A classifier routes each chunk to the fields it can answer, so extraction only runs on relevant text." },
      { title: "One typed schema", body: "Each field's data type, unit and currency is defined once and used for normalisation and evaluation." },
      { title: "Benchmark, then choose", body: "Claude, Qwen and Llama were benchmarked on extraction accuracy against the ground truth to select the production model." },
      { title: "Evaluation built in", body: "Field-level KPIs and missing-value reports are generated by the pipeline itself." },
    ],
    stack: [
      { group: "LLM & agents", items: ["Amazon Bedrock", "Strands Agents", "Claude", "Qwen", "Llama"] },
      { group: "Engineering", items: ["Python", "Pydantic", "FastAPI", "React", "TypeScript", "AWS EC2"] },
      { group: "Documents", items: ["python-docx", "pdfplumber", "langdetect"] },
      { group: "Evaluation", items: ["sentence-transformers", "pandas", "seaborn"] },
    ],
    contribution: [
      "Built the agentic LLM application end to end: extraction, source detection and multilingual normalisation.",
      "Wrote the Strands / Bedrock agent layer, prompt templates and Pydantic output models.",
      "Developed the FastAPI backend serving the LLM workflows, integrated with the React/TypeScript front end, and deployed on EC2.",
      "Built the ground-truth dataset and evaluation framework, and ran the model benchmark (Claude, Qwen, Llama).",
    ],
    results: [
      { label: "Fields extracted per contract", value: "25 typed PPA terms" },
      { label: "Models benchmarked", value: "Claude · Qwen · Llama" },
      // TODO(badiaa): replace with the measured figure from the KPI report, e.g. "x% exact match on numeric fields".
      { label: "Accuracy", value: "Reported per field in client KPI read-out" },
      { label: "Outcome", value: "PoC → reusable framework for energy-trading clients" },
    ],
    evidence: [
      { label: "Code is client-confidential", note: "Architecture, schema design and evaluation approach available to walk through in interview." },
    ],
    links: {},
  },
  {
    slug: "customer-360-data-platform",
    title: "Customer 360 Data Platform on GCP",
    tagline: "Production Customer Data Platform on GCP: five sources, hybrid real-time and incremental ingestion, cross-system identity resolution and ~25 BigQuery gold/mart tables feeding Braze and Salesforce.",
    context: "Hospitality & wellness group · Client engagement",
    year: "2026",
    status: "In production",
    domain: "Data platform · GCP",
    category: "Data engineering",
    featured: true,
    summary:
      "A production Customer Data Platform: ingestion from hotel PMS, spa / retail, marketing, CRM and website events into a GCS data lake, a Raw → Silver → Gold → Marts medallion in BigQuery, and deterministic identity resolution that unifies customers with no shared key.",
    problem: [
      "Guest data was split across a hotel PMS, a spa / retail system, Braze, Salesforce and website events — the same person existed several times with no shared key.",
      "Operational reporting, Braze campaigns and Salesforce CRM sync all needed one consistent Customer 360 view.",
    ],
    solution: [
      "Hybrid ingestion with Python ELT services on Cloud Run: event-driven webhooks for near-real-time PMS data and website events, watermark-based incremental loads for the PMS and spa systems — all landing raw in Cloud Storage.",
      "BigQuery SQL transformations across Raw → Silver → Gold → Marts, covering cleaning, schema validation, deduplication and business rules.",
      "Deterministic identity resolution (email, phone, normalised attributes) with survivorship rules unifies records across systems.",
      "~25 gold / mart tables power operational reporting, Customer 360, behavioural analytics, Braze audiences and Salesforce Person Account sync.",
      "Separate dev / prod environments with CI/CD on GitHub and Cloud Build, Cloud Scheduler for orchestration and Secret Manager for credentials.",
    ],
    architecture: {
      caption: "Raw → Silver → Gold → Marts, with identity resolution as its own layer. dev / prod via GitHub + Cloud Build.",
      nodes: [
        { id: "pms", label: "Hotel PMS", sub: "REST API", kind: "input", col: 0, row: 0, detail: "Hotel PMS (Clock PMS+) data: bookings, guests and related entities." },
        { id: "brp", label: "Spa & retail", sub: "REST API", kind: "input", col: 0, row: 1, detail: "BRP data: products, orders and related entities." },
        { id: "web", label: "Web · Braze · SFDC", sub: "real-time events & APIs", kind: "input", col: 0, row: 2, detail: "Real-time website events plus Braze and Salesforce data." },
        { id: "ingest", label: "ELT services", sub: "Cloud Run · webhooks · watermarks", kind: "service", col: 1, row: 1, detail: "Python services and jobs on Cloud Run: webhooks for near-real-time data, watermark-based incremental loads and backfills. Scheduled by Cloud Scheduler, credentials in Secret Manager." },
        { id: "gcs", label: "Raw landing", sub: "GCS · JSONL", kind: "store", col: 2, row: 1, detail: "Immutable raw files: entity=…/extraction_date=…/part-*.jsonl — replayable at any time." },
        { id: "silver", label: "Silver", sub: "BigQuery · deduplicated", kind: "store", col: 3, row: 1, detail: "silver_{source}_{entity} tables: source-shaped, typed and deduplicated." },
        { id: "identity", label: "Identity resolution", sub: "deterministic matching", kind: "guard", col: 4, row: 0, detail: "Deterministic matching on email, phone and normalised attributes into *_unified tables and bridge_customer_match, with documented survivorship rules for conflicting attributes." },
        { id: "gold", label: "Gold star schema", sub: "dim_* · fact_* · bridge_*", kind: "store", col: 4, row: 1, detail: "Dimensional model: dim_guest, dim_room_type, fact_booking, fact_charge, fact_brp_order_items…" },
        { id: "c360", label: "Customer 360", sub: "one row per customer", kind: "output", col: 5, row: 1, detail: "Customer 360 marts for operational reporting, behavioural analytics, Braze audiences and Salesforce Person Account sync." },
        { id: "braze", label: "Braze feeds", sub: "users · events", kind: "output", col: 6, row: 0, detail: "braze_users, braze_purchase_events, braze_custom_events." },
        { id: "sf", label: "Salesforce feeds", sub: "accounts · bookings", kind: "output", col: 6, row: 2, detail: "sf_person_account, sf_account, sf_booking, sf_event." },
      ],
      edges: [
        { from: "pms", to: "ingest" },
        { from: "brp", to: "ingest" },
        { from: "web", to: "ingest" },
        { from: "ingest", to: "gcs" },
        { from: "gcs", to: "silver" },
        { from: "silver", to: "identity" },
        { from: "silver", to: "gold" },
        { from: "identity", to: "c360" },
        { from: "gold", to: "c360" },
        { from: "c360", to: "braze" },
        { from: "c360", to: "sf" },
      ],
    },
    decisions: [
      { title: "Raw data first", body: "Raw data lands in a GCS data lake before it is loaded and transformed in BigQuery, layer by layer." },
      { title: "Identity as its own layer", body: "Deterministic matching on email, phone and normalised attributes unifies records that share no common key." },
      { title: "Automated environments", body: "Separate dev and prod, with Cloud Build deploying on code changes and Cloud Scheduler running the pipelines." },
    ],
    stack: [
      { group: "GCP", items: ["BigQuery", "Cloud Run", "Cloud Storage", "Cloud Build", "Cloud Scheduler", "Secret Manager"] },
      { group: "Engineering", items: ["Python", "Docker", "REST & webhooks", "SQL"] },
      { group: "Modelling", items: ["Medallion architecture", "Star schema", "Identity resolution"] },
      { group: "Activation", items: ["Braze", "Salesforce"] },
    ],
    contribution: [
      "Designed and built the platform end to end, from ingestion to CRM and marketing feeds.",
      "Developed the Python ELT services and the hybrid real-time / incremental ingestion strategy.",
      "Wrote the BigQuery transformations and designed and maintained ~25 gold / mart tables.",
      "Implemented cross-system identity resolution.",
      "Set up dev / prod environments and CI/CD with GitHub and Cloud Build.",
    ],
    results: [
      { label: "Sources unified", value: "5 systems" },
      { label: "Gold / mart tables", value: "~25" },
      { label: "Ingestion", value: "Near-real-time + incremental" },
      { label: "Status", value: "In production, dev / prod CI/CD" },
    ],
    evidence: [
      { label: "Code is client-confidential", note: "Data dictionary conventions and architecture available to discuss in interview." },
    ],
    links: {},
  },
  {
    slug: "medical-imaging-segmentation",
    title: "3D Medical Imaging Segmentation",
    tagline: "Volumetric deep learning for full-body CT multi-organ segmentation (0.82 Dice), extended to a three-stage MRI spine pipeline via transfer learning.",
    context: "Bonescreen GmbH · Medical imaging",
    year: "2025",
    status: "Delivered",
    domain: "Deep learning · Computer vision",
    category: "Deep learning",
    featured: true,
    summary:
      "An end-to-end PyTorch pipeline that segments organs in full-body CT, then a CT → MRI transfer that detects the spine, labels each vertebra and segments it voxel by voxel — validated with clinicians.",
    problem: [
      "Automate full-body CT segmentation, then extend the CT-based solution to MRI for automated spine analysis.",
      "CT and MRI differ in contrast, intensity and resolution, so the CT model could not be reused as-is.",
      "Results had to hold up in clinical visual review with medical experts, not only on metrics.",
    ],
    solution: [
      "3D CNN segmentation models trained in PyTorch on volumetric CT, with a preprocessing pipeline for intensity normalisation, resampling and mask validation.",
      "3D augmentation (rotations, flips, noise injection) and Optuna hyperparameter search, with every run, metric and model version tracked in MLflow.",
      "For MRI: transfer learning from the CT model into a three-stage pipeline — spine detection, vertebrae labelling, voxel-level segmentation.",
      "Ground-truth masks generated with SPINEPS and manually validated; evaluation with Dice and IoU plus clinical visual review with medical experts.",
    ],
    architecture: {
      caption: "CT pipeline first; the MRI pipeline reuses its weights and adds detection and labelling stages.",
      nodes: [
        { id: "scans", label: "CT / MRI volumes", sub: "multi-scanner", kind: "input", col: 0, row: 1, detail: "Full-body CT and spine MRI from different scanners and protocols." },
        { id: "gt", label: "Ground truth", sub: "SPINEPS + manual review", kind: "input", col: 0, row: 2, detail: "Masks generated with SPINEPS, then manually validated to ensure label quality before training." },
        { id: "prep", label: "Preprocessing", sub: "normalise · resample", kind: "service", col: 1, row: 1, detail: "Intensity normalisation, resampling to common spacing and mask validation." },
        { id: "aug", label: "3D augmentation", sub: "rotate · flip · noise", kind: "service", col: 2, row: 1, detail: "Improves robustness across scanners and protocols." },
        { id: "detect", label: "Spine detection", sub: "stage 1", kind: "model", col: 3, row: 0, detail: "Stage 1 of the MRI pipeline: spine detection." },
        { id: "seg", label: "3D CNN", sub: "PyTorch · transfer learning", kind: "model", col: 3, row: 1, detail: "Volumetric CNNs trained on CT, fine-tuned for MRI. Labelling (stage 2) assigns each vertebra its level before voxel-level segmentation (stage 3)." },
        { id: "tune", label: "Optuna + MLflow", sub: "search · tracking", kind: "store", col: 3, row: 2, detail: "Hyperparameter optimisation with Optuna; experiments, metrics and model versions in MLflow for reproducibility." },
        { id: "eval", label: "Evaluation", sub: "Dice · IoU · clinical review", kind: "guard", col: 4, row: 1, detail: "Quantitative metrics plus visual review with medical experts to confirm clinical relevance." },
        { id: "masks", label: "Masks", sub: "organs · vertebrae", kind: "output", col: 5, row: 1, detail: "Per-organ and per-vertebra masks for downstream analysis." },
      ],
      edges: [
        { from: "scans", to: "prep" },
        { from: "prep", to: "aug" },
        { from: "aug", to: "seg" },
        { from: "detect", to: "seg" },
        { from: "tune", to: "seg", dashed: true },
        { from: "seg", to: "eval" },
        { from: "gt", to: "eval", label: "ground truth" },
        { from: "eval", to: "masks" },
      ],
    },
    decisions: [
      { title: "Transfer, don't restart", body: "The CT model was adapted to MRI through transfer learning and fine-tuning." },
      { title: "Validated ground truth", body: "Masks were generated with SPINEPS and manually validated to ensure label quality." },
      { title: "Clinicians in the loop", body: "Dice and IoU were paired with clinical visual review by medical experts." },
    ],
    stack: [
      { group: "Deep learning", items: ["PyTorch", "3D CNNs", "Transfer learning"] },
      { group: "MLOps", items: ["MLflow", "Optuna"] },
      { group: "Imaging", items: ["SPINEPS", "Volumetric preprocessing", "3D augmentation"] },
      { group: "Collaboration", items: ["Agile", "Jira", "Bitbucket", "Confluence"] },
    ],
    contribution: [
      "Designed and trained the 3D CNN segmentation models for CT.",
      "Built the preprocessing, augmentation and validation pipeline.",
      "Adapted the CT model to MRI and designed the three-stage detection → labelling → segmentation pipeline.",
      "Ran evaluation with Dice / IoU and clinical review, working in an agile team of ML engineers and clinicians.",
    ],
    results: [
      { label: "CT multi-organ segmentation", value: "0.82 Dice" },
      { label: "MRI pipeline", value: "3 stages: detect → label → segment" },
      { label: "Validation", value: "Dice · IoU · clinical review" },
    ],
    evidence: [{ label: "Code is proprietary", note: "Happy to discuss the modelling and evaluation approach in interview." }],
    links: {},
  },
  {
    slug: "battery-predictive-maintenance",
    title: "Predictive Maintenance for Battery Health",
    tagline: "Finding what drives battery degradation across a device fleet — and predicting failures before they happen.",
    context: "ProGlove (Workaround GmbH) · Industrial IoT",
    year: "2022–24",
    status: "Deployed",
    domain: "Predictive ML · IoT",
    category: "Machine learning",
    featured: true,
    summary:
      "An end-to-end predictive-maintenance workflow on device and sensor data: cleaning and transformation, exploratory and statistical analysis of degradation, device segmentation, and failure-prediction models deployed for continuous monitoring.",
    problem: [
      "Battery degradation across the device fleet needed to be understood, and failures predicted early enough to act on them.",
    ],
    solution: [
      "Collected, cleaned and transformed device and sensor data with Python and SQL.",
      "Exploratory analysis and regression analysis to identify patterns, anomalies and correlations driving degradation.",
      "K-Means clustering to segment devices by performance.",
      "Failure-prediction models with feature engineering, model selection, hyperparameter tuning and evaluation — deployed for continuous monitoring and early failure detection.",
    ],
    architecture: {
      caption: "From raw device telemetry to monitored failure risk and maintenance strategy.",
      nodes: [
        { id: "devices", label: "Device data", sub: "sensor telemetry", kind: "input", col: 0, row: 1, detail: "Device and sensor data from the scanner fleet." },
        { id: "prep", label: "Data preparation", sub: "Python · SQL", kind: "service", col: 1, row: 1, detail: "Collection, cleaning and transformation into analysis-ready tables." },
        { id: "eda", label: "EDA & statistics", sub: "regression analysis", kind: "service", col: 2, row: 0, detail: "Patterns, anomalies and correlations behind battery degradation." },
        { id: "features", label: "Features", sub: "engineering", kind: "service", col: 2, row: 1, detail: "Features informed by the degradation analysis." },
        { id: "cluster", label: "Segmentation", sub: "K-Means", kind: "model", col: 2, row: 2, detail: "Devices grouped by performance profile." },
        { id: "model", label: "Failure model", sub: "selection · tuning", kind: "model", col: 3, row: 1, detail: "Failure-prediction models with model selection, hyperparameter tuning and evaluation." },
        { id: "monitor", label: "Monitoring", sub: "early failure detection", kind: "guard", col: 4, row: 1, detail: "Deployed models score devices continuously to flag early failure risk." },
        { id: "strategy", label: "Maintenance", sub: "strategy", kind: "output", col: 5, row: 1, detail: "Findings translated into predictive-maintenance strategies with engineering teams." },
      ],
      edges: [
        { from: "devices", to: "prep" },
        { from: "prep", to: "eda" },
        { from: "prep", to: "features" },
        { from: "prep", to: "cluster" },
        { from: "eda", to: "features", label: "insights" },
        { from: "features", to: "model" },
        { from: "cluster", to: "model", dashed: true },
        { from: "model", to: "monitor" },
        { from: "monitor", to: "strategy" },
      ],
    },
    decisions: [
      { title: "Understand before predicting", body: "EDA and regression analysis identified the degradation drivers before the failure models were built." },
      { title: "Segment the fleet", body: "K-Means clustering segmented devices by performance." },
    ],
    stack: [
      { group: "ML", items: ["scikit-learn", "Regression", "K-Means", "Hyperparameter tuning"] },
      { group: "Data", items: ["Python", "SQL", "pandas"] },
      { group: "Communication", items: ["Matplotlib", "Seaborn"] },
    ],
    contribution: [
      "Owned the full workflow: data preparation, analysis, modelling, evaluation and deployment.",
      "Communicated findings with visualisations and turned them into maintenance strategies with engineering teams.",
    ],
    results: [
      { label: "Outcome", value: "Early failure detection" },
      { label: "Workflow", value: "Data → model → continuous monitoring" },
    ],
    evidence: [{ label: "Code is proprietary", note: "Happy to walk through the analysis and modelling approach in interview." }],
    links: {},
  },
  {
    slug: "realtime-analytics-snowflake",
    title: "Near-Real-Time Analytics Platform",
    tagline: "Streaming and batch sources unified on AWS and Snowflake into analytics-ready models powering live dashboards, KPIs and alerts.",
    context: "ProGlove (Workaround GmbH) · Industrial IoT",
    year: "2022–24",
    status: "In production",
    domain: "Data engineering · Analytics",
    category: "Data engineering",
    featured: false,
    summary:
      "ETL pipelines integrating streaming and batch data, modular transformation workflows in dbt and AWS Glue, and Snowflake data models tuned for quality, scalability and query performance.",
    problem: [
      "Multiple streaming and batch sources had to be integrated into analytics-ready data models.",
      "Business teams needed real-time dashboards, KPIs and alerts.",
    ],
    solution: [
      "ETL pipelines in Python and SQL to process and integrate streaming and batch sources.",
      "Modular transformation workflows with dbt and AWS Glue for cleansing, enrichment and validation.",
      "Snowflake data models optimised for data quality, scalability and query performance.",
      "KPIs, dashboards and alerting defined together with analytics and business teams.",
    ],
    architecture: {
      caption: "Ingest → transform → model → serve, with validation built into the transformation layer.",
      nodes: [
        { id: "stream", label: "Streaming", sub: "event sources", kind: "input", col: 0, row: 0, detail: "Near-real-time operational events." },
        { id: "batch", label: "Batch", sub: "periodic sources", kind: "input", col: 0, row: 2, detail: "Periodic extracts from other systems." },
        { id: "etl", label: "ETL pipelines", sub: "Python · SQL", kind: "service", col: 1, row: 1, detail: "Processing and integration of streaming and batch data." },
        { id: "glue", label: "AWS Glue", sub: "processing", kind: "service", col: 2, row: 1, detail: "Automated processing jobs on AWS." },
        { id: "snow", label: "Snowflake", sub: "warehouse", kind: "store", col: 3, row: 1, detail: "Central warehouse, modelled for scalability and query performance." },
        { id: "dbt", label: "dbt models", sub: "cleanse · enrich", kind: "service", col: 4, row: 1, detail: "Modular, version-controlled transformations into analytics-ready models." },
        { id: "quality", label: "Validation", sub: "data quality", kind: "guard", col: 4, row: 2, detail: "Automated validation as part of the transformation workflow." },
        { id: "dash", label: "Dashboards", sub: "real-time KPIs", kind: "output", col: 5, row: 0, detail: "Real-time dashboards and KPIs for business teams." },
        { id: "alerts", label: "Alerts", sub: "performance", kind: "output", col: 5, row: 2, detail: "Alerting for real-time performance monitoring." },
      ],
      edges: [
        { from: "stream", to: "etl" },
        { from: "batch", to: "etl" },
        { from: "etl", to: "glue" },
        { from: "glue", to: "snow" },
        { from: "snow", to: "dbt" },
        { from: "quality", to: "dbt", dashed: true },
        { from: "dbt", to: "dash" },
        { from: "dbt", to: "alerts" },
      ],
    },
    decisions: [
      { title: "Modular transformations", body: "Transformations are built as modular workflows in dbt and AWS Glue." },
      { title: "Validation in the pipeline", body: "Cleansing, enrichment and validation run as part of the transformation workflows." },
    ],
    stack: [
      { group: "Platform", items: ["Snowflake", "AWS Glue", "dbt"] },
      { group: "Engineering", items: ["Python", "SQL", "Git", "Docker", "CI/CD"] },
    ],
    contribution: [
      "Designed and implemented the ETL pipelines for streaming and batch sources.",
      "Built the dbt and Glue transformation workflows and the Snowflake data models.",
      "Defined KPIs, dashboards and alerting with analytics and business teams.",
    ],
    results: [
      { label: "Sources", value: "Streaming + batch, unified" },
      { label: "Consumers", value: "Real-time dashboards, KPIs, alerts" },
    ],
    evidence: [{ label: "Code is proprietary", note: "Happy to discuss the modelling and pipeline design in interview." }],
    links: {},
  },
  {
    slug: "aws-data-lake-automation",
    title: "AWS Data Lake Automation",
    tagline: "Serverless data-quality checks, cross-account storage analysis and lifecycle policies that cut S3 storage costs by 22%.",
    context: "Luxoft Italy · Cloud data engineering",
    year: "2021–22",
    status: "In production",
    domain: "Cloud · Data engineering",
    category: "Data engineering",
    featured: false,
    summary:
      "Automated curation of an AWS data lake: Lambda workflows for validation, deduplication and anomaly detection, cross-account storage analysis, optimised storage classes and lifecycle rules, and QuickSight dashboards for health and cost.",
    problem: [
      "Storage costs and data quality across a multi-account AWS data lake needed automated monitoring and optimisation.",
    ],
    solution: [
      "Serverless data-quality workflows on AWS Lambda (Python, boto3, pandas) for validation, deduplication and anomaly detection.",
      "Automated cross-account S3 storage analysis producing CSV summaries for stakeholders.",
      "Optimised S3 storage classes and lifecycle policies for retention, archival and deletion.",
      "QuickSight dashboards on data-lake health, usage trends and storage costs, with drill-down; least-privilege IAM roles for cross-account automation.",
    ],
    architecture: {
      caption: "Serverless analysis feeds both cost policy and monitoring.",
      nodes: [
        { id: "s3", label: "S3 data lake", sub: "multiple accounts", kind: "store", col: 0, row: 1, detail: "The data lake, spread across AWS accounts." },
        { id: "iam", label: "IAM roles", sub: "least privilege", kind: "guard", col: 0, row: 2, detail: "Cross-account access with least-privilege roles." },
        { id: "quality", label: "Quality Lambda", sub: "validate · dedupe", kind: "service", col: 1, row: 0, detail: "Validation, deduplication and anomaly detection in Python." },
        { id: "storage", label: "Storage Lambda", sub: "cross-account", kind: "service", col: 1, row: 1, detail: "Analyses storage usage across accounts." },
        { id: "reports", label: "CSV summaries", sub: "usage · cost", kind: "store", col: 2, row: 1, detail: "Summaries for stakeholders and for dashboards." },
        { id: "policy", label: "Lifecycle", sub: "storage classes", kind: "guard", col: 2, row: 2, detail: "Storage classes and lifecycle rules for retention, archival and deletion." },
        { id: "qs", label: "QuickSight", sub: "health · cost", kind: "output", col: 3, row: 1, detail: "Dashboards on data-lake health, usage trends and storage costs, with drill-down." },
      ],
      edges: [
        { from: "s3", to: "quality" },
        { from: "s3", to: "storage" },
        { from: "iam", to: "storage", dashed: true },
        { from: "storage", to: "reports" },
        { from: "storage", to: "policy", label: "insights" },
        { from: "quality", to: "qs" },
        { from: "reports", to: "qs" },
      ],
    },
    decisions: [
      { title: "Serverless workflows", body: "Data-quality checks and storage analysis run on AWS Lambda." },
      { title: "Optimise storage", body: "S3 storage classes and lifecycle policies for retention, archival and deletion reduced storage costs by 22%." },
    ],
    stack: [
      { group: "AWS", items: ["Lambda", "S3", "IAM", "QuickSight"] },
      { group: "Engineering", items: ["Python", "boto3", "pandas"] },
    ],
    contribution: [
      "Built the serverless data-quality and storage-analysis workflows.",
      "Designed the storage-class and lifecycle optimisation.",
      "Built the QuickSight dashboards and configured cross-account IAM.",
      "Aligned governance and cost strategy with data managers and cloud engineers.",
    ],
    results: [
      { label: "Storage cost", value: "−22%" },
      { label: "Data quality", value: "Automated, serverless" },
    ],
    evidence: [{ label: "Code is proprietary", note: "Happy to discuss the approach in interview." }],
    links: {},
  },
  {
    slug: "plant-disease-detection",
    title: "Plant Disease Detection",
    tagline: "Transfer learning with VGG16 to classify plant diseases from leaf images — 90% accuracy.",
    context: "NetValue · Agriculture",
    year: "2020–21",
    status: "Delivered",
    domain: "Computer vision",
    category: "Deep learning",
    featured: false,
    summary:
      "A computer-vision classifier fine-tuned from a pretrained VGG16 in TensorFlow/Keras, with image preprocessing and augmentation, trained on AWS EC2 GPU instances.",
    problem: [
      "Classify plant diseases from leaf images, including diseases that look alike.",
    ],
    solution: [
      "Transfer learning from a pretrained VGG16 for multi-class disease classification in TensorFlow/Keras.",
      "Image preprocessing, normalisation and data augmentation to improve generalisation.",
      "Fine-tuning on AWS EC2 GPU instances.",
      "Evaluation with precision, recall and confusion-matrix analysis to reduce confusion between similar diseases.",
    ],
    architecture: {
      caption: "Pretrained backbone, fine-tuned head, evaluated per class.",
      nodes: [
        { id: "images", label: "Leaf images", sub: "labelled", kind: "input", col: 0, row: 1, detail: "Leaf images labelled by disease." },
        { id: "prep", label: "Preprocessing", sub: "normalise · augment", kind: "service", col: 1, row: 1, detail: "Normalisation and augmentation for generalisation." },
        { id: "vgg", label: "VGG16", sub: "pretrained", kind: "model", col: 2, row: 0, detail: "Pretrained convolutional backbone." },
        { id: "tune", label: "Fine-tuning", sub: "TensorFlow · Keras", kind: "model", col: 2, row: 1, detail: "Multi-class head fine-tuned on the leaf dataset." },
        { id: "ec2", label: "EC2 GPU", sub: "training", kind: "service", col: 2, row: 2, detail: "GPU instances on AWS for training." },
        { id: "eval", label: "Evaluation", sub: "precision · recall", kind: "guard", col: 3, row: 1, detail: "Precision, recall and confusion-matrix analysis per disease." },
        { id: "out", label: "Diagnosis", sub: "disease class", kind: "output", col: 4, row: 1, detail: "Predicted disease class per image." },
      ],
      edges: [
        { from: "images", to: "prep" },
        { from: "prep", to: "tune" },
        { from: "vgg", to: "tune", label: "weights" },
        { from: "ec2", to: "tune", dashed: true },
        { from: "tune", to: "eval" },
        { from: "eval", to: "out" },
      ],
    },
    decisions: [
      { title: "Transfer learning", body: "A pretrained VGG16 was fine-tuned for multi-class classification." },
      { title: "Beyond accuracy", body: "Precision, recall and confusion-matrix analysis were used to reduce misclassification between similar diseases." },
    ],
    stack: [
      { group: "Deep learning", items: ["TensorFlow", "Keras", "VGG16", "Transfer learning"] },
      { group: "Infrastructure", items: ["AWS EC2 (GPU)"] },
    ],
    contribution: ["Built the full pipeline: preprocessing, transfer learning, training and evaluation."],
    results: [{ label: "Accuracy", value: "90%" }, { label: "Task", value: "Multi-class disease classification" }],
    evidence: [{ label: "Related repository on GitHub", href: "https://github.com/badiaamakhlouf/Plant-disease-detection" }],
    links: { github: "https://github.com/badiaamakhlouf/Plant-disease-detection" },
  },
  {
    slug: "vineyard-yield-forecasting",
    title: "Vineyard Yield & Harvest Forecasting",
    tagline: "Gradient-boosting regression on weather, soil and yield history to forecast grape yield and harvest timing — deployed on AWS SageMaker.",
    context: "NetValue · Agriculture",
    year: "2020–21",
    status: "Deployed",
    domain: "Forecasting · MLOps",
    category: "Machine learning",
    featured: false,
    summary:
      "A regression pipeline integrating multi-source agricultural data with engineered seasonal and climate features, systematic model comparison, and deployment on SageMaker with retraining on new seasonal data.",
    problem: ["Forecast grape yield and optimal harvest timing from weather, soil and historical yield data."],
    solution: [
      "Integrated weather, soil and historical yield data, and engineered seasonal and climate features with pandas and NumPy.",
      "Trained and compared regression models in scikit-learn, tuned with GridSearchCV and k-fold cross-validation.",
      "Selected Gradient Boosting on R², RMSE and MAE.",
      "Deployed on AWS SageMaker with support for retraining on new seasonal data.",
    ],
    architecture: {
      caption: "Compare models systematically, deploy the winner, retrain every season.",
      nodes: [
        { id: "weather", label: "Weather", sub: "history", kind: "input", col: 0, row: 0, detail: "Historical weather data." },
        { id: "soil", label: "Soil", sub: "measurements", kind: "input", col: 0, row: 1, detail: "Soil data." },
        { id: "yield", label: "Yield", sub: "history", kind: "input", col: 0, row: 2, detail: "Historical yield records." },
        { id: "features", label: "Features", sub: "seasonal · climate", kind: "service", col: 1, row: 1, detail: "Seasonal and climate features engineered with pandas and NumPy." },
        { id: "compare", label: "Model comparison", sub: "GridSearchCV · k-fold", kind: "guard", col: 2, row: 1, detail: "Multiple regressors tuned and cross-validated in scikit-learn." },
        { id: "gb", label: "Gradient Boosting", sub: "R² · RMSE · MAE", kind: "model", col: 3, row: 1, detail: "Selected on R², RMSE and MAE." },
        { id: "sm", label: "SageMaker", sub: "deployment", kind: "service", col: 4, row: 1, detail: "Hosted model with retraining on new seasonal data." },
        { id: "out", label: "Forecasts", sub: "yield · harvest", kind: "output", col: 5, row: 1, detail: "Grape yield and optimal harvest timing." },
      ],
      edges: [
        { from: "weather", to: "features" },
        { from: "soil", to: "features" },
        { from: "yield", to: "features" },
        { from: "features", to: "compare" },
        { from: "compare", to: "gb" },
        { from: "gb", to: "sm" },
        { from: "sm", to: "out" },
        { from: "sm", to: "compare", dashed: true, label: "seasonal retrain" },
      ],
    },
    decisions: [
      { title: "Compare models", body: "Regression models were compared with GridSearchCV and k-fold cross-validation; Gradient Boosting was selected on R², RMSE and MAE." },
      { title: "Seasonal retraining", body: "The SageMaker deployment supports retraining on new seasonal data." },
    ],
    stack: [
      { group: "ML", items: ["scikit-learn", "Gradient Boosting", "GridSearchCV"] },
      { group: "Data", items: ["pandas", "NumPy"] },
      { group: "MLOps", items: ["AWS SageMaker"] },
    ],
    contribution: ["Built the pipeline end to end: data integration, features, model selection and SageMaker deployment."],
    results: [{ label: "Deployed on", value: "AWS SageMaker" }, { label: "Model", value: "Gradient Boosting, selected on R² / RMSE / MAE" }, { label: "Retraining", value: "Every new season" }],
    evidence: [{ label: "Code is proprietary", note: "Happy to discuss the approach in interview." }],
    links: {},
  },
  {
    slug: "airline-sentiment-analysis",
    title: "Airline Customer Sentiment Analysis",
    tagline: "NLP on pandemic-period customer chat logs to identify passenger sentiment and key service issues — refunds and safety.",
    context: "NetValue · Travel",
    year: "2020–21",
    status: "Delivered",
    domain: "NLP",
    category: "Machine learning",
    featured: false,
    summary:
      "An NLP pipeline in Python and NLTK that cleaned raw chat logs, classified sentiment, tracked it over time and by topic, and presented the findings in interactive Plotly dashboards.",
    problem: ["Understand passenger sentiment and the key service issues in customer chat logs from the pandemic period."],
    solution: [
      "NLP preprocessing with NLTK: tokenisation, lemmatisation and stopword removal on raw chat logs.",
      "Rule-based sentiment analysis classifying messages as positive, neutral or negative.",
      "Sentiment trends over time and by topic, plus frequent-term analysis.",
      "Interactive Plotly dashboards that surfaced key concerns such as refund delays and safety measures.",
    ],
    architecture: {
      caption: "Preprocess → classify sentiment → analyse trends and terms → dashboards.",
      nodes: [
        { id: "chats", label: "Chat logs", sub: "raw text", kind: "input", col: 0, row: 1, detail: "Customer chat logs from the pandemic period." },
        { id: "prep", label: "Preprocessing", sub: "NLTK", kind: "service", col: 1, row: 1, detail: "Tokenisation, lemmatisation and stopword removal." },
        { id: "terms", label: "Frequent terms", sub: "topics", kind: "service", col: 2, row: 0, detail: "Term frequency to surface recurring topics." },
        { id: "sent", label: "Sentiment", sub: "rule-based", kind: "model", col: 2, row: 1, detail: "Positive / neutral / negative classification." },
        { id: "trends", label: "Trends", sub: "time · topic", kind: "service", col: 3, row: 1, detail: "Sentiment over time and by topic." },
        { id: "dash", label: "Plotly", sub: "dashboards", kind: "output", col: 4, row: 1, detail: "Interactive dashboards on sentiment evolution and frequent terms." },
      ],
      edges: [
        { from: "chats", to: "prep" },
        { from: "prep", to: "terms" },
        { from: "prep", to: "sent" },
        { from: "sent", to: "trends" },
        { from: "terms", to: "dash" },
        { from: "trends", to: "dash" },
      ],
    },
    decisions: [{ title: "Rule-based sentiment", body: "Messages were classified as positive, neutral or negative with a rule-based approach, then analysed over time and by topic." }],
    stack: [{ group: "NLP", items: ["Python", "NLTK"] }, { group: "Visualisation", items: ["Plotly"] }],
    contribution: ["Built the preprocessing, sentiment analysis and dashboards end to end."],
    results: [{ label: "Key concerns surfaced", value: "Refund delays · safety measures" }, { label: "Outcome", value: "Service improvements prioritised" }],
    evidence: [{ label: "Code is proprietary", note: "Happy to discuss the approach in interview." }],
    links: {},
  },
];

/** Earlier and smaller public work — linked, not detailed. */
export const moreWork = [
  {
    title: "HerForge AI — The Women Behind AI",
    description: "A news web app that collects AI news from RSS feeds and uses Claude to classify and summarise it, highlighting stories about women in AI.",
    href: "https://github.com/badiaamakhlouf/women-in-ai-news",
    tags: ["Claude", "FastAPI", "Python"],
  },
  {
    title: "Generative AI — From Basics to Advanced",
    description: "Generative AI repository with project folders for a contract AI platform, an enterprise RAG copilot, Excel-to-system AI and an NL2SQL copilot.",
    href: "https://github.com/badiaamakhlouf/badiaa-generative-ai",
    tags: ["Generative AI", "LLMs"],
  },
  {
    title: "Data Science Portfolio",
    description: "Chronic kidney disease classification, melanoma cell detection with clustering, Parkinson's UPDRS prediction, Titanic survival prediction and data-preprocessing tools.",
    href: "https://github.com/badiaamakhlouf/data-science-portfolio",
    tags: ["Classification", "Clustering", "Healthcare"],
  },
  {
    title: "DS & ML Interview Bank",
    description: "A collection of questions covering data science and machine learning.",
    href: "https://github.com/badiaamakhlouf/DS_ML_InterviewBank",
    tags: ["Knowledge sharing"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
