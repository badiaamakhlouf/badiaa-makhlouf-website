import {
  siApacheparquet,
  siBitbucket,
  siClaude,
  siConfluence,
  siCplusplus,
  siDocker,
  siFastapi,
  siGit,
  siGithub,
  siGitlab,
  siGooglebigquery,
  siGooglecloud,
  siJira,
  siKeras,
  siMeta,
  siMlflow,
  siNumpy,
  siOptuna,
  siPandas,
  siPlotly,
  siPython,
  siPytorch,
  siQwen,
  siReact,
  siScikitlearn,
  siSnowflake,
  siTensorflow,
  siTypescript,
  siR,
  siJupyter,
  siPycharm,
  siSpyderide,
  siEclipseide,
  siGooglecolab,
  siMysql,
  siMongodb,
  siPostgresql,
  siApachecassandra,
  siQlik,
  siD3,
  siDash,
  siApachehadoop,
  siApachespark,
  siKubernetes,
  siApacheairflow,
  siScipy,
  siSpacy,
  siRasa,
  siDialogflow,
  siSelenium,
  siCoursera,
  siUdacity,
} from "simple-icons";

type SimpleIcon = { path: string; hex: string; title: string };

/**
 * A tool is drawn either from Simple Icons (CC0 brand paths) or, for brands that
 * Simple Icons does not ship (AWS services, dbt, Salesforce…), as a labelled tile
 * in the brand's colours.
 */
type Logo = { icon: SimpleIcon; color?: string } | { tile: string; bg: string; fg: string };

const AWS = (tile: string): Logo => ({ tile, bg: "#232F3E", fg: "#FF9900" });
const GCP: Logo = { icon: siGooglecloud };

const registry: Record<string, Logo> = {
  // AI / LLM
  "amazon bedrock": AWS("Br"),
  bedrock: AWS("Br"),
  "strands agents": { tile: "S", bg: "#0F172A", fg: "#FFFFFF" },
  "strands agents sdk": { tile: "S", bg: "#0F172A", fg: "#FFFFFF" },
  claude: { icon: siClaude },
  llama: { icon: siMeta },
  qwen: { icon: siQwen },
  // ML / DL
  pytorch: { icon: siPytorch },
  tensorflow: { icon: siTensorflow },
  keras: { icon: siKeras },
  "scikit-learn": { icon: siScikitlearn },
  mlflow: { icon: siMlflow },
  optuna: { icon: siOptuna },
  pandas: { icon: siPandas },
  numpy: { icon: siNumpy },
  "agile / scrum": { tile: "↻", bg: "#8B5CF6", fg: "#FFFFFF" },
  plotly: { icon: siPlotly },
  matplotlib: { tile: "plt", bg: "#11557C", fg: "#FFFFFF" },
  seaborn: { tile: "sns", bg: "#4C72B0", fg: "#FFFFFF" },
  nltk: { tile: "NLTK", bg: "#1E3A5F", fg: "#FFFFFF" },
  // Languages & engineering
  python: { icon: siPython },
  typescript: { icon: siTypescript },
  react: { icon: siReact, color: "#087EA4" },
  fastapi: { icon: siFastapi },
  docker: { icon: siDocker },
  git: { icon: siGit },
  github: { icon: siGithub },
  gitlab: { icon: siGitlab },
  bitbucket: { icon: siBitbucket },
  jira: { icon: siJira },
  confluence: { icon: siConfluence },
  "c / c++": { icon: siCplusplus },
  java: { tile: "Java", bg: "#E76F00", fg: "#FFFFFF" },
  sql: { tile: "SQL", bg: "#334155", fg: "#FFFFFF" },
  parquet: { icon: siApacheparquet },
  // AWS
  aws: AWS("aws"),
  "aws ec2": AWS("EC2"),
  "aws ec2 (gpu)": AWS("EC2"),
  ec2: AWS("EC2"),
  lambda: AWS("λ"),
  "aws lambda": AWS("λ"),
  s3: AWS("S3"),
  iam: AWS("IAM"),
  quicksight: AWS("QS"),
  "aws glue": AWS("Glue"),
  "aws sagemaker": AWS("SM"),
  sagemaker: AWS("SM"),
  athena: AWS("Ath"),
  // Data platforms
  snowflake: { icon: siSnowflake },
  dbt: { tile: "dbt", bg: "#FF694B", fg: "#FFFFFF" },
  bigquery: { icon: siGooglebigquery, color: "#4285F4" },
  gcp: GCP,
  "cloud run": GCP,
  "cloud storage": GCP,
  "cloud build": GCP,
  "cloud scheduler": GCP,
  "secret manager": GCP,
  salesforce: { tile: "SF", bg: "#00A1E0", fg: "#FFFFFF" },
  // Certificate issuers
  "amazon web services": AWS("aws"),
  "ibm · coursera": { icon: siCoursera },
  coursera: { icon: siCoursera },
  udacity: { icon: siUdacity },
  "deeplearning.ai": { tile: "DL", bg: "#F65B66", fg: "#FFFFFF" },
  // Full toolkit
  r: { icon: siR },
  "jupyter notebook": { icon: siJupyter },
  jupyterlab: { icon: siJupyter },
  "visual studio code": { tile: "VS", bg: "#007ACC", fg: "#FFFFFF" },
  pycharm: { icon: siPycharm },
  spyder: { icon: siSpyderide },
  eclipse: { icon: siEclipseide },
  matlab: { tile: "M", bg: "#E16737", fg: "#FFFFFF" },
  "ibm watson": { tile: "IBM", bg: "#0F62FE", fg: "#FFFFFF" },
  "amazon sagemaker": AWS("SM"),
  "google colab": { icon: siGooglecolab },
  mysql: { icon: siMysql },
  oracle: { tile: "O", bg: "#C74634", fg: "#FFFFFF" },
  "amazon dynamodb": AWS("DDB"),
  mongodb: { icon: siMongodb },
  postgres: { icon: siPostgresql },
  "apache cassandra": { icon: siApachecassandra },
  "amazon timestream": AWS("TS"),
  "amazon redshift": AWS("RS"),
  xgboost: { tile: "XGB", bg: "#189FDD", fg: "#FFFFFF" },
  lightgbm: { tile: "LGB", bg: "#3D7A3B", fg: "#FFFFFF" },
  scipy: { icon: siScipy },
  dialogflow: { icon: siDialogflow },
  rasa: { icon: siRasa },
  spacy: { icon: siSpacy },
  selenium: { icon: siSelenium },
  bert: { tile: "BERT", bg: "#FFD21E", fg: "#1F2937" },
  gpt: { tile: "GPT", bg: "#10A37F", fg: "#FFFFFF" },
  tableau: { tile: "T", bg: "#E97627", fg: "#FFFFFF" },
  "qlik sense": { icon: siQlik },
  dash: { icon: siDash },
  "d3.js": { icon: siD3 },
  "amazon emr": AWS("EMR"),
  "apache hadoop": { icon: siApachehadoop, color: "#1B8FC9" },
  "apache spark": { icon: siApachespark },
  pyspark: { icon: siApachespark },
  airflow: { icon: siApacheairflow },
  kubernetes: { icon: siKubernetes },
  "ci/cd": { tile: "CI", bg: "#334155", fg: "#FFFFFF" },
  scrum: { tile: "↻", bg: "#8B5CF6", fg: "#FFFFFF" },
  "extreme programming (xp)": { tile: "XP", bg: "#7C3AED", fg: "#FFFFFF" },
  kanban: { tile: "K", bg: "#0D9488", fg: "#FFFFFF" },
  braze: { tile: "Bz", bg: "#212124", fg: "#FFFFFF" },
};

export function getLogo(name: string): Logo | undefined {
  return registry[name.trim().toLowerCase()];
}

/** First `max` tools in `names` that have a logo, without repeating the same mark twice. */
export function logosFor(names: string[], max = 5) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const n of names) {
    const logo = getLogo(n);
    if (!logo) continue;
    const key = "icon" in logo ? logo.icon.title : `${logo.bg}-${logo.tile}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(n);
    if (out.length === max) break;
  }
  return out;
}

export function ToolLogo({ name, size = 28, className = "" }: { name: string; size?: number; className?: string }) {
  const logo = getLogo(name);
  if (!logo) return null;
  const inner = Math.round(size * 0.58);

  if ("tile" in logo) {
    const fontSize = logo.tile.length > 3 ? size * 0.26 : logo.tile.length > 2 ? size * 0.3 : size * 0.4;
    return (
      <span
        title={name}
        className={`inline-grid shrink-0 place-items-center rounded-full font-semibold ring-2 ring-panel ${className}`}
        style={{ width: size, height: size, background: logo.bg, color: logo.fg, fontSize, letterSpacing: "-0.02em" }}
      >
        {logo.tile}
      </span>
    );
  }
  return (
    <span
      title={name}
      className={`inline-grid shrink-0 place-items-center rounded-full border border-line bg-white ring-2 ring-panel ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={inner} height={inner} aria-hidden>
        <path d={logo.icon.path} fill={logo.color ?? `#${logo.icon.hex}`} />
      </svg>
    </span>
  );
}

/** Overlapping row of tool logos — e.g. AWS + Snowflake + dbt. */
export function LogoStack({ names, size = 30, max = 5 }: { names: string[]; size?: number; max?: number }) {
  const shown = logosFor(names, max);
  if (shown.length === 0) return null;
  return (
    <span className="flex items-center" aria-label={`Tools: ${shown.join(", ")}`}>
      {shown.map((n, i) => (
        <ToolLogo key={n} name={n} size={size} className={i > 0 ? "-ml-2" : ""} />
      ))}
    </span>
  );
}

/** Badge with the tool's logo (when it has one) and its name. */
export function TechBadge({ name }: { name: string }) {
  const has = !!getLogo(name);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-panel py-0.5 pr-2.5 pl-0.5 text-[12px] text-fg/85">
      {has ? <ToolLogo name={name} size={20} className="ring-0" /> : <span className="size-1.5 rounded-full bg-faint ml-2" />}
      {name}
    </span>
  );
}
