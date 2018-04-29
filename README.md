# Personal Web Page

## Offline Site Building

### Install Ruby
```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
\curl -sSL https://get.rvm.io | bash -s stable --ruby
source ~/.profile
rvm install ruby --latest
```

### Install Gems
Run these commands from the repository
```
gem install bundler
bundle install
```

If the `bundle install` fails, trying deleting `Gemfile.lock`.

### Run the Server
Run below command and visit `localhost:4000` to view the site
```
  bundle exec jekyll serve
```
