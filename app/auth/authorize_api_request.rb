class AuthorizeApiRequest
  def initialize(headers = {})
    @headers = headers
  end

  def call
    {user: user}
  end

  private
  attr_reader :headers

  def user
    # check if the user is in the database
    # memoize user object
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token

  rescue ActiveRecord::RecordNotFound => e
    raise(ExceptionHandler::InvalidToken, ("#{Message.invalid_token} #{e.message}"))

  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_headers)
  end

  def http_auth_headers
    if headers['Authorization'].present?
      return headers['Authorization'].split(' ').last
    end
    raise(ExceptionHandler::MissingToken, Message.missing_token)
  end

end