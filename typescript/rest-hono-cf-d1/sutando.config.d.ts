declare const config: {
  client: any;
  connection: {
    database: string;
    wranglerPath: string;
  };
  useNullAsDefault: boolean;
  migrations: {
    table: string;
    path: string;
  };
  models: {
    path: string;
  };
};

export default config;