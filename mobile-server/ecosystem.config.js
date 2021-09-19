const REPO = 'git@gitlab.com:LuasHa2000/mobile-server.git';
module.exports = {
  apps: [
    {
      name: 'Mobile-server',
      script: './dist/bin/index.js'
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: '18.163.166.211',
      ref: 'origin/master',
      repo: REPO,
      ssh_options: 'StrictHostKeyChecking=no',
      path: '/root/home/ubuntu/mobile-server/',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart /home/ubuntu/mobile-server/ecosystem.config.js && pm2 save'
    }
  }
};
