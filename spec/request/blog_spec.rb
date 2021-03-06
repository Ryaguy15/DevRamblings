require 'rails_helper'

RSpec.describe 'Blogs Api', type: :request do
  let(:user) { create(:user) }
  let!(:blogs) { create_list(:blog, 10, user_id: user.id) }
  let(:blog_id) { blogs.first.id }
  let(:headers) { valid_headers }

  describe 'GET /blogs' do
    before { get '/v1/blogs'}

    it 'returns the blogs' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns a 200 code' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /blogs/:id' do

    before { get "/v1/blogs/#{blog_id}" }

    context 'When the blog exists' do
      it 'returns the blog' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(blog_id)

      end

      it 'returns a 200 code' do
        expect(response).to have_http_status(200)
      end
    end

    context 'When the record does not exists' do
      let(:blog_id) { 100 }

      it 'returns 404 code' do
        expect(response).to have_http_status(404)
      end

      it 'returns an error message' do
        expect(response.body).to match(/Couldn't find Blog/)
      end
    end
  end

  describe 'POST /blogs' do
    let(:valid_attributes) { {title: Faker::Lorem.sentence, body: Faker::Lorem.paragraph} }

    context 'When request is valid' do
      before { post '/v1/blogs', params: valid_attributes.to_json, headers: headers  }
      it 'creates a blog' do
        expect(json['title']).to eq(valid_attributes[:title])
        expect(json['body']).to eq(valid_attributes[:body])
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/v1/blogs', params: { title: 'Foobar' }.to_json, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/Validation failed: Body can't be blank/)
      end
    end
  end

  describe 'PUT /blogs/:id' do
    let(:valid_attributes) { { title: 'This is a cool blog' }.to_json }

    context 'When the record exists' do
      before { put "/v1/blogs/#{blog_id}", params: valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  describe 'DELETE /blogs/:id' do

    before { delete "/v1/blogs/#{blog_id}", headers: headers}

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end