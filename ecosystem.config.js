module.exports = {
    apps: [
      {
        name: 'frontend',
        script: 'serve', // Assuming you're using 'serve' to serve your front-end build
        args: '-s dist', // The directory where the front-end build is located
        env: {
          PORT: 5173,
        },
      },
      {
        name: 'backend',
        script: '/backend/bootstrap.js', // Path to the built back-end entry point
        watch: true,
        env: {
          NODE_ENV: 'production',
          PORT: 7002,
        },
      },
    ],
  };
  