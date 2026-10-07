// The full skills list, exactly as provided by Badiaa (CV skills section).
// Shown on /skills under "Full toolkit"; tools with a logo get one automatically.

export const toolkit: { title: string; items: string[] }[] = [
  { title: "Programming languages", items: ["Python", "SQL", "Java", "R", "C / C++"] },
  {
    title: "Technologies",
    items: ["Jupyter Notebook", "JupyterLab", "Visual Studio Code", "PyCharm", "Spyder", "Eclipse", "MATLAB", "IBM Watson", "Amazon SageMaker"],
  },
  { title: "Cloud platforms", items: ["AWS EC2", "S3", "Lambda", "AWS Glue", "Google Colab"] },
  {
    title: "Databases",
    items: ["MySQL", "Oracle", "Amazon DynamoDB", "MongoDB", "Postgres", "Apache Cassandra", "Amazon Timestream"],
  },
  { title: "Data warehouses", items: ["Snowflake", "Amazon Redshift", "BigQuery"] },
  {
    title: "Machine learning",
    items: [
      "Linear Regression",
      "Logistic Regression",
      "Ridge Regression",
      "Lasso Regression",
      "Decision Trees",
      "Random Forest",
      "SVM",
      "SVR",
      "AdaBoost",
      "XGBoost",
      "LightGBM",
      "PCA",
      "KNN",
      "Naive Bayes",
      "K-means Clustering",
      "Hierarchical Clustering",
    ],
  },
  { title: "Deep learning", items: ["Neural Networks", "CNNs", "RNNs", "Autoencoders", "GANs"] },
  { title: "ML libraries", items: ["pandas", "NumPy", "SciPy", "scikit-learn", "PyTorch", "TensorFlow", "Keras"] },
  { title: "Natural language processing", items: ["Dialogflow", "Rasa", "spaCy", "Selenium", "NLTK", "BERT", "GPT"] },
  { title: "Time series", items: ["LSTM", "ARIMA", "ARMA"] },
  {
    title: "Data visualisation",
    items: ["Tableau", "QuickSight", "Qlik Sense", "Matplotlib", "Seaborn", "Plotly", "Dash", "D3.js"],
  },
  { title: "Big data", items: ["Amazon EMR", "Apache Hadoop", "Apache Spark", "PySpark", "dbt"] },
  { title: "MLOps", items: ["MLflow", "Docker", "Airflow", "Kubernetes"] },
  { title: "DevOps", items: ["CI/CD", "Git", "GitHub"] },
  { title: "Agile methodologies", items: ["Scrum", "Extreme Programming (XP)", "Kanban"] },
];

/** Spoken languages. `level` is 1–5, used only to draw the indicator. */
export const spokenLanguages = [
  { name: "Arabic", label: "Native", level: 5 },
  { name: "English", label: "Fluent", level: 4 },
  { name: "French", label: "Fluent", level: 4 },
  { name: "Italian", label: "Advanced", level: 3 },
  { name: "German", label: "B1", level: 2 },
];
