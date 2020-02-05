require 'rails_helper'

RSpec.describe AuthorizeApiRequest do
  # test user
  let(:user) { create(:user) }

  # mock auth headers
  let(:headers) { {'Authorization' => token_generator(user.id)} }

  # Invalid Request
  subject(:invalid_request_obj) { described_class.new({}) }

  # Valid Request
  subject(:valid_request_obj) { described_class.new(headers) }

  # Auth API
  describe "#call" do
    # returns the user object when request is valid
    context 'When request is valid' do
      it 'returns the user object' do
        request = valid_request_obj.call
        expect(request[:user]).to eq(user)
      end
    end

    context 'When request is invalid' do
      context 'Missing Token' do
        it 'returns a missing token error message' do
          expect { invalid_request_obj.call }
              .to raise_exception(ExceptionHandler::MissingToken, "Missing token")
        end
      end
    end

    context 'When invalid token' do
      subject(:invalid_request_obj) do
        described_class.new({'Authorization' => token_generator(5)})
      end
      it 'raises an InvalidToken error' do
        expect { invalid_request_obj.call }
            .to raise_error(ExceptionHandler::InvalidToken, /Invalid token/)
      end
    end

    context 'When expired token' do
      let(:headers) { {'Authorization' => expired_token_generator(user.id)} }
      subject(:expired_request_obj) { described_class.new(headers) }

      it 'raises expired token error' do
        expect {expired_request_obj.call}
            .to raise_exception(ExceptionHandler::InvalidToken, /Signature has expired/)
      end
    end

    context 'Fake Token' do
      let(:header) { { 'Authorization' => 'foobar' } }
      subject(:invalid_request_obj) { described_class.new(header) }

      it 'handles JWT::DecodeError' do
        expect { invalid_request_obj.call }
            .to raise_error(
                    ExceptionHandler::InvalidToken,
                    /Not enough or too many segments/
                )
      end
    end
  end

end