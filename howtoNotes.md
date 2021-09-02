
## Run `sudo apt-get install -y nodejs` to install Node.js 14.x and npm
## You may also need development tools to build native addons:
     sudo apt-get install gcc g++ make
## To install the Yarn package manager, run:
     curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
     echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
     sudo apt-get update && sudo apt-get install yarn


## upgrade ubuntu
 do-release-upgrade -d


## ubuntu create user
 adduser sammy
 usermod -aG sudo sammy


 ## test ngi
 nginx -t


 ln -s /etc/nginx/sites-available/waterthetrees.com /etc/nginx/sites-enabled/waterthetrees.com 

sudo service nginx reload
sudo service nginx stop
sudo service nginx restart
sudo service nginx start