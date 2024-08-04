module.exports = {
    apps: [
      {
        name: 'frontend',
        script: 'npm', // Assuming you're using 'serve' to serve your front-end build
        args: 'run dev', // The directory where the front-end build is located
        cwd: './frontend',
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
      {
        name: 'backend',
        script: 'npm', // Path to the built back-end entry point
        args: 'run dev',
        cwd: './backend',
        watch: true,
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  