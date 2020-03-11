namespace :client do
  desc "Runs yarn build in the client folder"
  task build: :environment do
    sh("cd client && yarn build")
  end

  desc "Copies static client files into the public folder"
  task migrate_files: "build" do
    sh("cd client/build && cp -r * ../../public")
  end

end
