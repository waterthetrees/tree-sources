module.exports = {
  apps: [
    {
      script: "src/index.js",
      name: "wtt_server",
      instances: "max",
      exec_mode: "fork",
      node_args: "--require dotenv/config",
      env: {
        NODE_ENV: "production",
      },
      env_development: {
        DOTENV_CONFIG_DEBUG: true,
        DOTENV_CONFIG_PATH:
          "/var/www/html/dev.waterthetrees.com/tree-sources/.env",
      },
    },
  ],
  deploy: {
    production: {
      user: "trees",
      host: "localhost",
      ref: "origin/main",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
