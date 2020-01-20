module RequestSpecHelper
  # parse the json to a ruby hash
  def json
    JSON.parse(response.body)
  end
end