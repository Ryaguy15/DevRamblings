require 'rails_helper'

RSpec.describe AuthenticateUser do
  let(:user) { create(:user) }

  subject(:valid_auth) { described_class.new(user.email, user.password) }
  subject(:invalid_auth) { described_class.new('foo', 'bar') }


  describe "#call" do
    # returns the token when valid auth
    context 'Auth is valid' do
      it 'returns the token' do
        token = valid_auth.call
        expect(token).not_to be_nil
      end
    end

    # raises an authentication error when invalid auth
    context "Auth is invalid" do
      it 'raises an authentication error' do
        expect{invalid_auth.call}.to raise_error( ExceptionHandler::AuthenticationError,
                                                  /Invalid credentials/)
      end
    end
  end

end